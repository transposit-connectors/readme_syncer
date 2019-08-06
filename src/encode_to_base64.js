(params) => {
  var CryptoJS = require("crypto-js");

  var wordArray = CryptoJS.enc.Utf8.parse(params.text);
  var base64 = CryptoJS.enc.Base64.stringify(wordArray);
  return base64;
}
