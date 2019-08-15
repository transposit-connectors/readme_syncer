(params) => {
  let blob = api.run('this.find_blob_object', {
    owner: 'transposit',
    repo: 'www',
    branch: 'jpwain/browse-apps',
    path: '/src/apps/a/applicant_tracker.md'
  })[0];
  let content = blob.content;
  return api.run('front_matter_parser.parse', {"$body.content": content, base64: true});
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */