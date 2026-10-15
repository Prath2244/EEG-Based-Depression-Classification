/* ── Auto-dismiss flash messages ── */
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    document.querySelectorAll('.flash-alert').forEach(el => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(el);
      bsAlert.close();
    });
  }, 5000);
});

/* ── Toggle password visibility ── */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'bi bi-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'bi bi-eye';
  }
}

/* ── Smooth number counters on dashboard ── */
function animateCounter(el, target, duration = 800) {
  const start    = 0;
  const step     = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  let startTime = null;
  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-card__value').forEach(el => {
    const val = parseInt(el.textContent.replace(/[^0-9]/g, ''));
    if (!isNaN(val) && val > 0) animateCounter(el, val);
  });
});

/* ── Navbar active highlight on scroll ── */
document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') && current.includes(link.getAttribute('href').replace('/', ''))) {
      link.classList.add('active');
    }
  });
});

/* ── Feature input real-time validation highlight ── */
document.addEventListener('input', function (e) {
  if (e.target.classList.contains('feature-input')) {
    const val = e.target.value.trim();
    if (val && !isNaN(parseFloat(val))) {
      e.target.classList.add('filled');
      e.target.classList.remove('is-invalid');
    } else if (val) {
      e.target.classList.add('is-invalid');
      e.target.classList.remove('filled');
    } else {
      e.target.classList.remove('filled', 'is-invalid');
    }
  }
});

/* ── Form validation before submit ── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('predictionForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    const inputs = form.querySelectorAll('.feature-input[required]');
    let hasError = false;

    inputs.forEach(input => {
      const val = input.value.trim();
      if (!val || isNaN(parseFloat(val))) {
        input.classList.add('is-invalid');
        hasError = true;
      }
    });

    if (hasError) {
      e.preventDefault();
      // Scroll to first invalid
      const first = form.querySelector('.is-invalid');
      if (first) {
        // Open its parent accordion
        const body = first.closest('.accordion-body');
        if (body) {
          body.classList.add('open');
          const toggle = body.previousElementSibling;
          if (toggle) {
            toggle.classList.add('open');
            const chevron = toggle.querySelector('.accordion-chevron');
            if (chevron) chevron.classList.add('rotated');
          }
        }
        first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        first.focus();
      }
    }
  });
});

/* ── Tooltip init (Bootstrap) ── */
document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(el => new bootstrap.Tooltip(el));
});