(() => {
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('li-id').value.trim();
    const password = document.getElementById('li-password').value;
    const err = document.getElementById('li-error');
    err.textContent = '';
    try { Auth.login(id, password); window.location.replace('menu.html'); }
    catch (ex) { err.textContent = ex.message || 'Invalid credentials'; }
  });
})();

