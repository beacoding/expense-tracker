export const claimsHelpers = {
  toDateString,
  calculateTotal
}

// Converts a UTC Date to a date string to Date String Format
function toDateString(utcDate) {
  return new Date(utcDate).toDateString();
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
