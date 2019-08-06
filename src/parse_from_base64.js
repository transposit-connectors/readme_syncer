(params) => {
  var CryptoJS = require("crypto-js");
  var parsedWordArray = CryptoJS.enc.Base64.parse(params.text.replace(/\n/g,""));
  var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);

  return parsedStr;
}
