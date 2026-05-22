document.addEventListener('DOMContentLoaded', () => {
  const WEBHOOK_URL = 'https://hook.eu2.make.com/rayuxd5eehcinc761fa0eu0dch1pabsm';

  const params = new URLSearchParams(window.location.search);
  const urlInput = document.getElementById('web-url');
  const emailInput = document.getElementById('email');

  if (urlInput && params.get('url')) {
    urlInput.value = decodeURIComponent(params.get('url'));
  }
  if (emailInput && params.get('email')) {
    emailInput.value = decodeURIComponent(params.get('email'));
  }

  const form = document.getElementById('audit-form');
  const successEl = document.getElementById('success-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !submitBtn) {
    console.warn('[auditoria] Formulario no encontrado en el DOM.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlField = document.getElementById('web-url');
    const emailField = document.getElementById('email');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    if (!urlField || !emailField || !btnText) return;

    const url = urlField.value.trim();
    const email = emailField.value.trim();

    if (!url || !email) return;

    submitBtn.disabled = true;
    btnText.textContent = 'Analizando…';

    if (btnIcon) {
      const spinner = document.createElement('div');
      spinner.className = 'spinner';
      spinner.id = 'btn-icon';
      spinner.setAttribute('aria-hidden', 'true');
      btnIcon.replaceWith(spinner);
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, source: 'auditoria-webdavid' }),
      });

      if (!response.ok) {
        console.warn('[auditoria] Webhook respondió con estado:', response.status);
      }
    } catch (error) {
      // Make.com a veces devuelve error CORS pero procesa el webhook igualmente
      console.warn('[auditoria] Error de red al contactar Make:', error);
    } finally {
      if (successEl) {
        form.style.display = 'none';
        successEl.style.display = 'flex';
      }
    }
  });
});
