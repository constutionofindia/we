const Auth = (() => {
  const KEY_USERS = 'ua_users';
  const KEY_SESSION = 'ua_session';
  function loadUsers() { try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; } catch { return []; } }
  function saveUsers(users) { localStorage.setItem(KEY_USERS, JSON.stringify(users)); }
  function signup(user) {
    const users = loadUsers();
    if (users.some(u => u.username.toLowerCase() === user.username.toLowerCase())) throw new Error('Username taken');
    if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) throw new Error('Email in use');
    users.push(user); saveUsers(users); localStorage.setItem(KEY_SESSION, JSON.stringify({ username: user.username }));
  }
  function login(id, password) {
    const users = loadUsers();
    const user = users.find(u => u.email.toLowerCase() === id.toLowerCase() || u.username.toLowerCase() === id.toLowerCase());
    if (!user || user.password !== password) throw new Error('Invalid credentials');
    localStorage.setItem(KEY_SESSION, JSON.stringify({ username: user.username }));
  }
  function logout() { localStorage.removeItem(KEY_SESSION); }
  function isLoggedIn() { return !!localStorage.getItem(KEY_SESSION); }
  function currentUser() {
    const session = JSON.parse(localStorage.getItem(KEY_SESSION) || 'null');
    if (!session) return null;
    return loadUsers().find(u => u.username === session.username) || null;
  }
  return { signup, login, logout, isLoggedIn, currentUser, loadUsers };
})();

const Theme = (() => {
  const KEY = 'ua_theme';
  function apply(theme) {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg', '#f1f5f9');
      document.documentElement.style.setProperty('--text', '#0b1220');
      document.documentElement.style.setProperty('--card', '#ffffff');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--text');
      document.documentElement.style.removeProperty('--card');
    }
  }
  function initToggle(btnId) {
    const saved = localStorage.getItem(KEY) || 'dark';
    apply(saved);
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => {
      const next = (localStorage.getItem(KEY) || 'dark') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(KEY, next); apply(next);
    });
  }
  return { initToggle };
})();

function timeNow() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
