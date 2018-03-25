export const claimItemsHelpers = {
  distanceToAmount,
  amountToDistance,
  encodeFileToB64,
}

function distanceToAmount(distance, pricePerMile) {
  return distance * pricePerMile;
}

function amountToDistance(amount, pricePerMile) {
  return amount / pricePerMile;
}

function encodeFileToB64(fileToUpload){
  if (fileToUpload === null){
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
