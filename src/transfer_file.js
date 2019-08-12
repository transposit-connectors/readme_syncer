(params) => {  
  var source = api.run('this.parse_github_url', {url: params.source_url})[0];
  var target = api.run('this.parse_github_url', {url: params.target_url})[0];
  var github_user = api.run('github.get_user_authenticated', {})[0];

  if (source && target) {
    var source_blob = api.run("this.find_blob_object", { owner: source.owner, path: source.path, repo: source.repo, branch: source.branch, user: params.user })[0];
    var target_blob = api.run("this.find_blob_object", { owner: target.owner, path: target.path, repo: target.repo, branch: target.branch, user: params.user })[0];
    
    // check to see that source file exists:
    if (source_blob == null) {
      return "Couldn't copy github url " + params.source_url + " because the url is invalid.";
    }
    var body = { committer: { name: github_user.login, email: github_user.email },
                 message: "copied from " + params.source_url,
                 branch: target.branch,
                 content: source_blob.content
               };
    if (target_blob) {
      console.log("hello " + target_blob);
      body["sha"] = target_blob.sha;
    }
    try {
      api.run("github.add_file_to_repo", { owner: target.owner, path: target.path, repo: target.repo, $body: body }, { asUser: params.user.id });
    } catch(e) {
      return "Couldn't copy github url " + params.source_url + " to " + params.target_url + ": " + e;
    }
  } else {
    if (source == null) {
      return params.source_url + " isn't a valid Github url.";
    }
    if (target == null) {
      return params.target_url + " isn't a valid Github url.";
    }
  }
  return "Copied " + params.source_url + " to " + params.target_url + "!";
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
