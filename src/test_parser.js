(params) => {
  let blob = api.run('this.find_blob_object', {
    owner: 'transposit-connectors',
    repo: 'applicant_tracker',
    branch: 'master',
    path: 'README.md'
  })[0];
  let content = blob.content;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */