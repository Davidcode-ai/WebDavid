const WEBHOOK_URL = 'https://hook.eu2.make.com/rayuxd5eehcinc761fa0eu0dch1pabsm';

function prefillFromQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const urlInput = document.getElementById('web-url');
  const emailInput = document.getElementById('email');

  if (!urlInput || !emailInput) return;

  const url = params.get('url');
  const email = params.get('email');

  if (url) urlInput.value = decodeURIComponent(url);
  if (email) emailInput.value = decodeURIComponent(email);
}

function setSubmitLoading(submitBtn, btnIcon, btnText, isLoading) {
  if (!submitBtn || !btnIcon || !btnText) return;

  submitBtn.disabled = isLoading;
  btnText.textContent = isLoading ? 'Analizando…' : 'Analizar mi web gratis ahora';

  if (isLoading) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'btn-icon';
    spinner.setAttribute('aria-hidden', 'true');
    btnIcon.replaceWith(spinner);
  }
}

function showSuccess(form, successEl) {
  if (!form || !successEl) return;
  form.style.display = 'none';
  successEl.style.display = 'flex';
}

function initAuditoriaForm() {
  prefillFromQueryParams();

  const form = document.getElementById('audit-form');
  const successEl = document.getElementById('success-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlInput = document.getElementById('web-url');
    const emailInput = document.getElementById('email');
    const btnText = document.getElementById('btn-text');
    let btnIcon = document.getElementById('btn-icon');

    if (!urlInput || !emailInput) return;

    const url = urlInput.value.trim();
    const email = emailInput.value.trim();

    if (!url || !email) return;

    setSubmitLoading(submitBtn, btnIcon, btnText, true);
    btnIcon = document.getElementById('btn-icon');

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, source: 'auditoria-webdavid' }),
      });
    } catch {
      // Make.com a veces devuelve error CORS pero procesa el webhook igualmente
    } finally {
      showSuccess(form, successEl);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuditoriaForm);
} else {
  initAuditoriaForm();
}
