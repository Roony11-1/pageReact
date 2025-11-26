import { Link } from 'react-router-dom';
import '../../assets/css/Footer/footer.css';
import { useState } from 'react';



export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Verificar si la tecla presionada es "Enter"
    if (e.key === 'Enter') {
      e.preventDefault();
      if (email) {
        setIsSubscribed(true);
      }
      setTimeout(() => {
        setIsSubscribed(false); // Ocultar el mensaje
        setEmail(''); 
      }, 4000); //4000 ms = 4 segundos
    }
  }

  return (
    <footer className="Footer">
      <div className="footer-col">
        <h3>Level-Up Store © 2025</h3>
        <p>Tu tienda de confianza para todo lo relacionado con videojuegos.</p>
        <div className="footer-link">
          <Link to="nosotros">Nosotros</Link>
          <Link to="contactos">Contacto</Link>
        </div>
      </div>

      <div className="footer-col">
        <p>Categorías: Consolas, Juegos, Accesorios, Merchandising</p>
      </div>

      <div className="footer-col">
        <p>Suscríbete a nuestra newsletter</p>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyPress}
        />
        {isSubscribed && <p>¡Te has suscrito!</p>}
      </div>
    </footer>
  )
}