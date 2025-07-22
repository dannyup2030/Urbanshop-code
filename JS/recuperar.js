// Simulamos un código enviado al correo
let codigoEnviado = null;

const emailForm = document.getElementById('emailForm');
const resetForm = document.getElementById('resetForm');

emailForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailForm.email.value.trim();
  if (!email) {
    alert('Por favor, ingresa un correo válido.');
    return;
  }

  // Aquí iría la llamada real a backend para enviar correo
  // Simulamos generando un código de 6 dígitos
  codigoEnviado = Math.floor(100000 + Math.random() * 900000).toString();
  alert(`Código enviado a ${email}: ${codigoEnviado} (simulado)`);

  // Mostrar formulario para ingresar código y nueva contraseña
  emailForm.classList.add('hidden');
  resetForm.classList.remove('hidden');
});

resetForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigoIngresado = resetForm.code.value.trim();
  const newPassword = resetForm.newPassword.value;
  const confirmPassword = resetForm.confirmPassword.value;

  if (codigoIngresado !== codigoEnviado) {
    alert('Código incorrecto.');
    return;
  }

  if (newPassword.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Aquí iría la llamada real a backend para actualizar contraseña
  alert('Contraseña cambiada exitosamente.');

  // Redirigir a inicio o login
  window.location.href = 'Sesion.html';
});
 // Toggle menú hamburguesa móvil
    const menuBtn = document.getElementById('menu-btn');
    const menuMobile = document.getElementById('menu-mobile');

    menuBtn.addEventListener('click', () => {
      menuMobile.classList.toggle('hidden');
    });