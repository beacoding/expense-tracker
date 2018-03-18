const Json2csvParser = require('json2csv').Parser;
var FileSaver = require('file-saver');

export const reportsHelpers = {
  generateT24,
  generatePayroll,
  generateAllEntries
}

function generateT24(claimsMap) {
  var lookupArr = [];
  for (var key in claimsMap) {
    var claim = claimsMap[key];
    if (claim.account_number && claim.status == 'A') {
      var lookupEntry = {
        "account_number": "",
        "currency": "CAD",
        "date": Date.now(),
        "description": "",
        "amount": 0,
        "SAM": 51,
      }
      lookupEntry.account_number = claim.account_number;
      lookupEntry.date = claim.date_created;
      lookupEntry.description = claim.description;
      lookupEntry.amount = claim.total_amount;
      lookupArr.push(lookupEntry);
    }
  }
  if (lookupArr.length < 1) {
    // in case there are no entries
    lookupArr.push({})
  }
  const json2csvParser = new Json2csvParser({ header: false, delimiter: '|'  });
  const csv = json2csvParser.parse(lookupArr);
  const filename = 'T24_' + new Date().toISOString().substr(0, 10) + '.csv';
  var blob = new Blob([csv], {type: "csv/csv;charset=utf-8"});
  FileSaver.saveAs(blob, filename);
}


function generatePayroll(claimsMap) {
  var entryMap = {};
  for (var key in claimsMap) {
    var claim = claimsMap[key];
    if (!claim.account_number  && claim.status == 'A') {
      var lookupEntry = {
        "employee_name": "",
        "employee_id": "",
        "expense_reimbursement": 0,
      }
      lookupEntry.employee_name = claim.claimant_first_name + " " + claim.claimant_last_name;
      lookupEntry.employee_id = claim.claimant_id;
      lookupEntry.expense_reimbursement = claim.total_amount;
      if (!entryMap[lookupEntry.employee_id]) {
        entryMap[lookupEntry.employee_id] = lookupEntry;
      } else {
        var totalReimbursement = parseFloat(entryMap[lookupEntry.employee_id]["expense_reimbursement"]);
        totalReimbursement += parseFloat(lookupEntry.expense_reimbursement);
        entryMap[lookupEntry.employee_id]["expense_reimbursement"] = totalReimbursement;
      }
    }
  }
  var entryArr = [];
  Object.entries(entryMap).map((entry) => {
    entryArr.push(entry[1]);
  });
  if (entryArr.length < 1) {
    // in case there are no entries
    entryArr.push({})
  }
  const json2csvParser = new Json2csvParser({ header: false, delimiter: '|'  });
  const csv = json2csvParser.parse(entryArr);
  const filename = 'payroll_' + new Date().toISOString().substr(0, 10) + '.csv';
  var blob = new Blob([csv], {type: "csv/csv;charset=utf-8"});
  FileSaver.saveAs(blob, filename);
}

function generateAllEntries(claimsMap) {
  var lookupArr = [];
  for (var key in claimsMap) {
    var claim = claimsMap[key];
    if (claim.status == 'A') {
      if (!claim.account_number) {
        var payrollEntry = [];
        payrollEntry.push(claim.claimant_first_name + " " + claim.claimant_last_name);
        payrollEntry.push(claim.claimant_id);
        payrollEntry.push(claim.total_amount);
        lookupArr.push(payrollEntry);
      } else {
          var t24Entry = [];
          t24Entry.push(claim.account_number);
          t24Entry.push("CAD");
          t24Entry.push(claim.date_created);
          t24Entry.push(claim.description);
          t24Entry.push(claim.total_amount);
          t24Entry.push("51");
          lookupArr.push(t24Entry);
      }
    }
  }
  var data = lookupArr.join('\r\n').toString().replace(/,/g, '|');
  const filename = 'all_entries_' + new Date().toISOString().substr(0, 10) + '.txt';
  var blob = new Blob([data], {type: "plain/text;charset=utf-8"});
  FileSaver.saveAs(blob, filename);
}