export const claimItemsHelpers = {
  distanceToAmount,
  amountToDistance
}

function distanceToAmount(distance, pricePerMile) {
  return distance * pricePerMile;
}

function amountToDistance(amount, pricePerMile) {
  return amount / pricePerMile;
}