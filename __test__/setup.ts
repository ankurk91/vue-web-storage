// suppress all those red colored errors
window.console.error = (e: Error) => {
  e instanceof Error && console.log(e.message)
};
