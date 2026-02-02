import styles from './Layout.module.css';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Settings', path: '/settings' },
  { label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector(state => state.ui);

  return (
    <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarClosed : ''}`}>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive ? '#fff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
              fontWeight: 500,
              transition: 'background-color 0.2s',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
