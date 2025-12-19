// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Urban Shop. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
