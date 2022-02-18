({ url, branch }) => {
  // e.g. https://github.com/transposit-connectors/applicant_tracker/blob/master/README.md
  var regex = new RegExp(
    "(https://)*(github.com/)*(.+?)/(.+?)/blob/" + branch + "/(.+)"
  );
  // e.g. https://github.com/transposit-connectors/applicant_tracker/blob/master/README.md
  // var url_match = regex.exec(url);
  var url_match = regex.exec(url);
  if (url_match) {
    return {
      owner: url_match[3],
      repo: url_match[4],
      branch: branch,
      path: url_match[5],
    };
  }
  return null;
};

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
