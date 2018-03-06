const Json2csvParser = require('json2csv').Parser;
var FileSaver = require('file-saver');

export const reportsHelpers = {
  generateT24
}

function generateT24(claimsMap) {
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
      lookupEntry.date = claim.date_created;
      lookupArr.push(lookupEntry);
    }
  }
  const fields = ['account_number', 'currency', 'date', 'description', 'amount', 'SAM',];


  const json2csvParser = new Json2csvParser({ fields, delimiter: '|'  });
  const csv = json2csvParser.parse(lookupArr);


  const filename = 't24.csv';

  var blob = new Blob([csv], {type: "csv/csv;charset=utf-8"});
  FileSaver.saveAs(blob, filename );
}


function generatePayroll(claimsMap) {
  var lookupArr = [];

  for (var key in claimsMap) {
    var claim = claimsMap[key];
    if (!claim.account_number) {
      var lookupEntry = {
        "employee_name": "",
        "employee_id": "",
        "date_created": Date.now(),
        "expense_reimbursement": 0,
      }
      lookupEntry.employee_name = claim.claimee_first_name + " " + claim.claimee_last_name;
      lookupEntry.employee_id = claim.description;
      lookupEntry.expense_reimbursement = claim.total_amount;
      lookupEntry.date = claim.date_created;
      lookupArr.push(lookupEntry);
    }
  }
  const fields = ['employee_name', 'employee_id', 'expense_reimbursement'];


  const json2csvParser = new Json2csvParser({ fields, delimiter: '|'  });
  const csv = json2csvParser.parse(lookupArr);


  const filename = 'payroll.csv';

  var blob = new Blob([csv], {type: "csv/csv;charset=utf-8"});
  FileSaver.saveAs(blob, filename );
}
