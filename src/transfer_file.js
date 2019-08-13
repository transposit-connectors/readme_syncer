({app_name, from_app}) => {
  let docs_branch = env.get('docs_branch');
  var app = {
    "owner": "transposit-connectors",
    "repo": app_name,
    "branch": "master",
    "path": "README.md"
  };
  var docs = {
    "owner": "transposit",
    "repo": "www",
    "branch": docs_branch,
    "path": `${app_name}.md`
  };

  let source = from_app ? app : docs;
  let target = from_app ? docs : app;

  var github_user = api.run('github.get_user_authenticated', {})[0];

  var source_blob = api.run("this.find_blob_object", { owner: source.owner, path: source.path, repo: source.repo, branch: source.branch })[0];
  var target_blob = api.run("this.find_blob_object", { owner: target.owner, path: target.path, repo: target.repo, branch: target.branch })[0];

  // check to see that source file exists:
  if (source_blob == null) {
    return "Invalid source";
  }
  var userEmail = user_setting.get('committer_email');
  var commitEmail = userEmail ? userEmail : github_user.email;
  if (commitEmail == null) {
    return "Please set an email address: " + env.getBuiltin().appUrl;
  }
  var body = { committer: { name: github_user.login, email: commitEmail},
    message: `Copied from ${source.owner}/${source.repo} on branch ${source.branch}`,
    branch: target.branch,
    content: source_blob.content
  };
  if (source_blob.sha === target_blob.sha) {
    return `Skipped commit since files are the same`;
  }
  if (target_blob) {
    body["sha"] = target_blob.sha;
  }
  try {
    api.run("github.add_file_to_repo", { owner: target.owner, path: target.path, repo: target.repo, $body: body });
  } catch(e) {
    return e;
  }
  return `Copied from https://github.com/${source.owner}/${source.repo}/blob/${source.branch}/${source.path} to https://github.com/${target.owner}/${target.repo}/blob/${target.branch}/${target.path}`;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
