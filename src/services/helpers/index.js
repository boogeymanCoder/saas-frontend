export function getDomain(params, options) {
  var currentUrl = window.location.host.split('.')[0];
  return currentUrl;
}
