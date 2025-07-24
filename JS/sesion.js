document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const rol = form.rol.value;

    if (!email || !password || !rol) {
      alert('Por favor completa todos los campos, incluido el rol.');
      return;
    }

    // Aquí podrías agregar validación real si tuvieras backend
    alert(`Bienvenido ${email}\nRol seleccionado: ${rol}`);

    // Guardar el rol en localStorage si se quiere usar más adelante
    localStorage.setItem('rolUsuario', rol);

    // Redirigir (simulado)
    if (rol === 'admin') {
      window.location.href = 'admin.html'; // si tienes una página de administrador
    } else {
      window.location.href = 'inicio.html'; // lo puedes cambiar por otra según tu app
    }
  });
});
