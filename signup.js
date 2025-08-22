(() => {
  Theme.initToggle?.('dm-toggle');
  const suStep1 = document.getElementById('signup-step-1');
  const suStep2 = document.getElementById('signup-step-2');
  const stepIndicator = document.getElementById('signup-step-indicator');
  const suErr1 = document.getElementById('su-step1-error');
  const suErr2 = document.getElementById('su-step2-error');

  function goto(step) {
    if (step === 1) { suStep1.classList.remove('hidden'); suStep2.classList.add('hidden'); stepIndicator.textContent = '1'; }
    else { suStep1.classList.add('hidden'); suStep2.classList.remove('hidden'); stepIndicator.textContent = '2'; }
    suErr1.textContent = ''; suErr2.textContent = '';
  }

  document.getElementById('btn-su-next').addEventListener('click', () => {
    const name = document.getElementById('su-name').value.trim();
    const username = document.getElementById('su-username').value.trim();
    const email = document.getElementById('su-email').value.trim();
    const password = document.getElementById('su-password').value;
    suErr1.textContent = '';
    if (!name || !username || !email || !password) { suErr1.textContent = 'Please fill in all fields.'; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { suErr1.textContent = 'Enter a valid email.'; return; }
    if (password.length < 6) { suErr1.textContent = 'Password must be at least 6 characters.'; return; }
    const form = document.getElementById('signup-form');
    form.dataset.step1 = JSON.stringify({ name, username, email, password });
    goto(2);
  });

  document.getElementById('btn-su-back').addEventListener('click', () => goto(1));

  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    suErr2.textContent = '';
    try {
      const { name, username, email, password } = JSON.parse(e.currentTarget.dataset.step1 || '{}');
      const dob = document.getElementById('su-dob').value;
      const gender = document.getElementById('su-gender').value;
      const prefs = Array.from(document.querySelectorAll('#prefs-group .pref-card.selected')).map(c => c.dataset.value);
      if (!dob || !gender) { suErr2.textContent = 'Please complete required fields.'; return; }
      try { Auth.signup({ name, username, email, password, dob, gender, prefs }); }
      catch (err) { suErr2.textContent = err.message || 'Signup failed'; return; }
      window.location.replace('menu.html');
    } catch (err) {
      suErr2.textContent = 'Please complete Step 1 first.';
    }
  });

  // Preference card selection
  document.getElementById('prefs-group').addEventListener('click', (e) => {
    const card = e.target.closest('.pref-card');
    if (!card) return;
    card.classList.toggle('selected');
  });
})();

