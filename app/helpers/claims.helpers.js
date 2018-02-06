export const claimsHelpers = {
  toDateString,
  getStatusText,
  calculateTotal
}

// Converts a UTC Date to a date string to Date String Format
function toDateString(utcDate) {
  return new Date(utcDate).toDateString();
}

// Converts claim.status to the appropriate status definition
function getStatusText(status) {
  switch (status) {
    case "A":
      status = "Approved";
      break;
    case "D":
      status = "Declined";
      break;
    case "S":
      status = "Submitted";
      break;
    default:
      status = "Not Yet Submitted";
  }
  return status;
}

// Calculates the total amount of a claim
function calculateTotal(claim, claimItems) {
  let currentTotal = 0;
  claimItems.forEach((claimItem) => {
    let amount = claimItem.amount;
    currentTotal += amount;
  });

  claim["total_amount"] = currentTotal.toFixed(2);
}
