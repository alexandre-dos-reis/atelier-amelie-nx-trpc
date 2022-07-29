import { Link } from 'react-router-dom';
import { routes } from '../../utils/routes';

export const Navbar = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to={routes['home'].url}>Accueil</Link>
        <Link to={routes['artworks'].url}>Artworks</Link>
      </nav>
    </div>
  );
};
