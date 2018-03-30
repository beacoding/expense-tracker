export const toastrHelpers = {
  getSuccessOptions,
  getErrorOptions
}

function getSuccessOptions() {
  const toastrOptions = {
    timeOut: 5000,
    newestOnTop: false,
    position: 'top-right',
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    progressBar: false,
    showCloseButton: true // true by default
  }
  return toastrOptions;
}

function getErrorOptions() {
  const toastrOptions = {
    timeOut: 5000, // set to 0 to prevent auto-close
    newestOnTop: false,
    position: 'top-right',
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    progressBar: false,
    showCloseButton: true // true by default
  }
  return toastrOptions;
}
