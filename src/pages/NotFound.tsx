import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: 'var(--background-color)',
      color: 'var(--text-main)',
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 'bold', margin: 0, color: 'var(--primary-color)' }}>404</h1>
      <h2 style={{ fontSize: '2rem', margin: '1rem 0' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
};
