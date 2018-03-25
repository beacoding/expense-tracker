export const claimItemsHelpers = {
  distanceToAmount,
  amountToDistance,
  encodeFile,
  encodeFileToB64,
  // base64MimeType,
  // b64toBlob
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
    })
  }

function encodeFile(fileToUpload) {
  if (fileToUpload === null){
    return new Promise((resolve) => {
      resolve();
    });
  }
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = function () {
      // const mimeType = base64MimeType(reader.result);  /// uncomment this to return blob
      // const b64String = base64String(reader.result);   /// uncomment this to return blob
      // const blob = b64toBlob(b64String, mimeType);     /// uncomment this to return blob
      // resole(blob)                                     /// uncomment this to return blob
      // const blobURL = URL.createObjectURL(blob);
      // resolve(blobURL);
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      reject();
    }
  })
}

function base64MimeType(encoded) {
  var result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

function base64String(encoded){
  let result = encoded.split(",");
  return result[1];

}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}