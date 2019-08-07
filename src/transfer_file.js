(params) => {
  
  var source = parse_github_url(params.source_url);
  var target = parse_github_url(params.target_url);
  var github_user = api.run('github.get_user_authenticated', {}, { asUser: params.user.id })[0];

  if (source && target) {
    var source_blob = api.run("this.find_blob_object", { owner: source.owner, path: source.path, repo: source.repo, branch: source.branch, user: params.user })[0];
    var target_blob = api.run("this.find_blob_object", { owner: target.owner, path: target.path, repo: target.repo, branch: target.branch, user: params.user })[0];
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

  function parse_github_url(url) {
    // https://github.com/transposit-connectors/applicant_tracker/blob/master/README.md
    var url_match = /(https:\/\/)*(github.com\/)*(.+?)\/(.+?)\/blob\/(.+?)\/(.+)/.exec(url);
    if (url_match) {
      return { owner: url_match[3], 
               repo: url_match[4],
               branch: url_match[5],
               path: url_match[6]
             };
    }
    return null;
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
