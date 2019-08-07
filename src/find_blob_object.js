(params) => {
  var dir = ".";
  var filename = params.path;
  var match = params.path.match(/(.+)\/+(.*)/);
  if (match) {
    dir = match[1];
    filename = match[2];
  }
  var gitPath = api.run("github.get_files_in_repo", {owner: params.owner, repo: params.repo, path: dir, ref: params.branch}, { asUser: params.user.id });
  var gitBlob = null;
  for (var i in gitPath) {
    if (gitPath[i].name === filename) {
      gitBlob = gitPath[i];
    }
  }
  if (gitBlob) {
    return api.run("github.get_blob", { owner: params.owner, repo: params.repo, shaCode: gitBlob.sha }, { asUser: params.user.id })[0];
  }
  return null;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
