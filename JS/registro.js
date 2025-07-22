document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');

  if (!form) return; // si no está el formulario, no hace nada

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const celular = form.celular.value.trim();
    const cedula = form.cedula.value.trim();
    const fechaNacimiento = form.fechaNacimiento.value;
    const password = form.password.value;

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (!/^\d{10}$/.test(celular)) {
      alert('El número de celular debe tener 10 dígitos.');
      return;
    }

    if (!/^\d+$/.test(cedula)) {
      alert('La cédula debe contener solo números.');
      return;
    }

    alert(`¡Registro exitoso!
Nombre: ${nombre}
Email: ${email}
Celular: ${celular}
Cédula: ${cedula}
Fecha de nacimiento: ${fechaNacimiento}`);

    form.reset();
  });
});

// Toggle menú hamburguesa móvil
const menuBtn = document.getElementById('menu-btn');
const menuMobile = document.getElementById('menu-mobile');

menuBtn.addEventListener('click', () => {
  menuMobile.classList.toggle('hidden');
});