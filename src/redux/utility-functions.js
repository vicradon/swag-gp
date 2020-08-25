export function snack(msg) {
  const snackbar = document.querySelector('#snackbar');
  snackbar.textContent = msg;
  snackbar.className = "show";
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000)
}