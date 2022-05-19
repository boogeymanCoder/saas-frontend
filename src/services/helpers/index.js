export function getDomain() {
  var currentUrl = window.location.host.split('.')[0];
  console.log({ currentUrl });
  return currentUrl;
}
