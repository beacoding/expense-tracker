const Json2csvParser = require('json2csv').Parser;
var FileSaver = require('file-saver');

export const reportsHelpers = {
  generateT4
}

function generateT4(claimsMap) {
  var lookupArr = [];

  for (var key in claimsMap) {
    var claim = claimsMap[key];
    if (claim.account_number) {
      var lookupEntry = {
        "account_number": "",
        "currency": "CAD",
        "date": Date.now(),
        "description": "",
        "amount": 0,
        "SAM": 51,
      }
      lookupEntry.account_number = claim.account_number;
      lookupEntry.description = claim.description;
      lookupEntry.amount = claim.total_amount;
      lookupArr.push(lookupEntry);
    }
  }
  const fields = ['account_number', 'currency', 'date', 'description', 'amount', 'SAM',];


  const json2csvParser = new Json2csvParser({ fields, delimiter: '|'  });
  const csv = json2csvParser.parse(lookupArr);


  const filename = 'export.csv';

  var blob = new Blob([csv], {type: "csv/csv;charset=utf-8"});
  FileSaver.saveAs(blob, filename );
}
