// =====================================================
// Wellspring Family Clinic — Scripts
// Sections: Mobile Nav Toggle | Scroll Fade-in | Form Validation |
//           Checklist Opt-in | Footer Year
// =====================================================

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu after a link is tapped
navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll Fade-in Animation =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((el) => fadeObserver.observe(el));

// ===== Appointment Form Validation & Submission =====
const form = document.getElementById('appointmentForm');
const formSuccess = document.getElementById('formSuccess');

const fields = {
  fullName: {
    input: document.getElementById('fullName'),
    error: document.getElementById('fullNameError'),
    validate: (value) => value.trim().length > 0,
    message: 'Please enter your full name.',
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('emailError'),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: 'Please enter a valid email address.',
  },
  phone: {
    input: document.getElementById('phone'),
    error: document.getElementById('phoneError'),
    validate: (value) => /^[\d\s()+-]{7,}$/.test(value.trim()),
    message: 'Please enter a valid phone number.',
  },
};

function validateField(field) {
  const value = field.input.value;
  const valid = field.validate(value);

  if (valid) {
    field.input.classList.remove('invalid');
    field.error.textContent = '';
  } else {
    field.input.classList.add('invalid');
    field.error.textContent = field.message;
  }

  return valid;
}

// Validate on blur for immediate feedback
Object.values(fields).forEach((field) => {
  field.input.addEventListener('blur', () => validateField(field));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const results = Object.values(fields).map((field) => validateField(field));
  const allValid = results.every(Boolean);

  if (!allValid) {
    formSuccess.hidden = true;
    return;
  }

  const appointmentData = {
    fullName: fields.fullName.input.value.trim(),
    email: fields.email.input.value.trim(),
    phone: fields.phone.input.value.trim(),
    preferredDate: document.getElementById('preferredDate').value,
    message: document.getElementById('message').value.trim(),
  };

  console.log('Appointment request submitted:', appointmentData);

  // ---------------------------------------------------------------
  // Real backend integration would go here, e.g.:
  // fetch('/api/appointments', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(appointmentData),
  // });
  // ---------------------------------------------------------------

  formSuccess.hidden = false;
  form.reset();
  Object.values(fields).forEach((field) => field.input.classList.remove('invalid'));
});

// ===== Checklist Opt-in (Free Resource) =====
const checklistForm = document.getElementById('checklistForm');
const checklistSuccess = document.getElementById('checklistSuccess');
const checklistEmail = document.getElementById('checklistEmail');
const checklistEmailError = document.getElementById('checklistEmailError');

function validateChecklistEmail() {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checklistEmail.value.trim());

  if (valid) {
    checklistEmail.classList.remove('invalid');
    checklistEmailError.textContent = '';
  } else {
    checklistEmail.classList.add('invalid');
    checklistEmailError.textContent = 'Please enter a valid email address.';
  }

  return valid;
}

checklistEmail.addEventListener('blur', validateChecklistEmail);

checklistForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateChecklistEmail()) {
    checklistSuccess.hidden = true;
    return;
  }

  console.log('Checklist requested for:', checklistEmail.value.trim());

  // ---------------------------------------------------------------
  // Real integration would go here, e.g. posting to an email
  // service provider (Mailchimp, ConvertKit) or a fetch('/api/leads', ...)
  // ---------------------------------------------------------------

  checklistSuccess.hidden = false;
  checklistForm.reset();
  checklistEmail.classList.remove('invalid');
});

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();
