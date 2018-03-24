// suppress all those red colored errors
window.console.error = (e) => {
  e instanceof Error && console.log(e.message)
};
