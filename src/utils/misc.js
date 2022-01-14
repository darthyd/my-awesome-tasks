export function sleep(ms) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
