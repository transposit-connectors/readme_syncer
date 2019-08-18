(params) => {
  var CryptoJS = require("crypto-js");

  let blob = api.run('this.find_blob_object', {
    owner: 'transposit',
    repo: 'www',
    branch: 'jpwain/browse-apps',
    path: '/src/apps/a/applicant_tracker.md'
  })[0];
  let content = decode(blob.content);
  return api.run('front_matter_parser.parse', {"$body.content": content, base64: false});

  function decode(content) {
    var parsedWordArray = CryptoJS.enc.Base64.parse(content.replace(/\n/g,""));
    var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
    return parsedStr;
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */