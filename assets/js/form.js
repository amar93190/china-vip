/* ============================================================
   FORMULAIRE DE CONTACT
   ============================================================ */
(function () {
  'use strict';

  var form    = document.getElementById('contact-form');
  var btn     = document.getElementById('form-btn');
  var success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validation basique */
    var requiredFields = form.querySelectorAll('[required]');
    var valid = true;

    requiredFields.forEach(function (field) {
      var group = field.closest('.form-group');
      if (!field.value.trim()) {
        if (group) group.classList.add('has-error');
        valid = false;
      } else {
        if (group) group.classList.remove('has-error');
      }
    });

    if (!valid) return;

    /* État envoi */
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Envoi en cours…';

    /* Envoi vers Formspree (ou tout autre endpoint) */
    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          btn.style.display = 'none';
          success.classList.add('visible');
        } else {
          btn.disabled = false;
          btn.querySelector('span').textContent = 'Envoyer ma demande';
          alert('Une erreur est survenue. Merci de nous contacter par WhatsApp ou email.');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.querySelector('span').textContent = 'Envoyer ma demande';
        alert('Impossible d\'envoyer le message. Vérifiez votre connexion.');
      });
  });

  /* Retire l'erreur dès que l'utilisateur corrige le champ */
  form.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('input', function () {
      var group = field.closest('.form-group');
      if (field.value.trim() && group) group.classList.remove('has-error');
    });
  });
})();
