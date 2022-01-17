const SnackbarEl = document.createElement('div');
SnackbarEl.className = 'snackbar';
document.body.appendChild(SnackbarEl);
let timeout;

window.Snackbar = {
    alert: (message) => {
        SnackbarEl.innerHTML = message;
        SnackbarEl.classList.add('show');
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            SnackbarEl.classList.remove('show');
            timeout = null;
        }, 3000);
    }
}
