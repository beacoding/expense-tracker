export const toastrHelpers = {
  getErrorOptions
}

function getErrorOptions() {
  const toastrOptions = {
    timeOut: 0, // by setting to 0 it will prevent the auto close
    showCloseButton: true// true by default
  }
  return toastrOptions;
}
