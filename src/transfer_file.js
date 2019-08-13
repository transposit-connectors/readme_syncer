(params) => {
  let docs_branch = env.get('docs_branch');
  var app = api.run('this.parse_github_url', {url: params.app_url, branch: 'master'})[0];
  var docs = api.run('this.parse_github_url', {url: params.docs_url, branch: docs_branch})[0];
  var github_user = api.run('github.get_user_authenticated', {})[0];

  console.log(github_user)
  if (app && docs) {
    console.log(app)
    var source_blob = api.run("this.find_blob_object", { owner: app.owner, path: app.path, repo: app.repo, branch: app.branch, user: params.user })[0];
    var target_blob = api.run("this.find_blob_object", { owner: docs.owner, path: docs.path, repo: docs.repo, branch: docs.branch, user: params.user })[0];

    // check to see that source file exists:
    if (source_blob == null) {
      return "Couldn't copy github url " + params.app_url + " because the url is invalid.";
    }
    var body = { committer: { name: github_user.login, email: github_user.email },
      message: "copied from " + params.app_url,
      branch: docs.branch,
      content: source_blob.content
    };
    if (target_blob) {
      body["sha"] = target_blob.sha;
    }
    try {
      api.run("github.add_file_to_repo", { owner: docs.owner, path: docs.path, repo: docs.repo, $body: body });
    } catch(e) {
      return "Couldn't copy github url " + params.app_url + " to " + params.docs_url + ": " + e;
    }
  } else {
    if (app == null) {
      return params.app_url + " isn't a valid Github url.";
    }
    if (docs == null) {
      return params.docs_url + " isn't a valid Github url.";
    }
  }
  return "Copied " + params.app_url + " to " + params.docs_url + "!";
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
