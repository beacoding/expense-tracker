export const claimItemsHelpers = {
  distanceToAmount,
  amountToDistance,
  encodeFileToB64,
}

function distanceToAmount(distance, pricePerMile, pricePerMileTier2, maxTier1, mileage_so_far_per_month) {
  let max_tier_1_distance = maxTier1 / pricePerMile;
  maxTier1 = maxTier1 - mileage_so_far_per_month >= 0 ? maxTier1 - mileage_so_far_per_month : 0;
  let tier_1_cost = distance > max_tier_1_distance ? max_tier_1_distance * pricePerMile : distance * pricePerMile;
  let tier_2_cost = distance > max_tier_1_distance ? (distance - max_tier_1_distance) * pricePerMileTier2  : 0
  return tier_1_cost + tier_2_cost;
}

function amountToDistance(amount, pricePerMile, pricePerMileTier2, maxTier1, mileage_so_far_per_month) {
  maxTier1 = maxTier1 - mileage_so_far_per_month >= 0 ? maxTier1 - mileage_so_far_per_month : 0;
  let tier_1_distance = amount > maxTier1 ? maxTier1 / pricePerMile : amount / pricePerMile;
  let tier_2_distance = amount > maxTier1 ? (amount - maxTier1) / pricePerMileTier2 : 0;
  return tier_1_distance + tier_2_distance;
}

function encodeFileToB64(fileToUpload) {
  if (fileToUpload === null) {
    return new Promise((resolve) => {
      resolve();
    });
  }
    return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload= function() {
      resolve(reader.result);
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
      reject();
    }
    });
  }
