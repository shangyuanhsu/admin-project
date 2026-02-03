import { useState } from 'react';
import styles from './Layout.module.css';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../stores/hooks';
import { logout } from '../features/auth/authSlice';
import type { MenuItem } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { closeSidebar } from '../stores/uiSlice';

const SidebarItem = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const hasChildren = item.children && item.children.length > 0;
  
  const paddingLeft = `${0.75 + depth * 1.5}rem`;

  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      dispatch(closeSidebar());
    }
  };

  if (hasChildren) {
    return (
      <div>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: `0.75rem 1rem 0.75rem ${paddingLeft}`,
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            userSelect: 'none',
          }}
          className={styles.sidebarItemInteractive}
        >
          {item.label}
          <span>{isOpen ? '▼' : '▶'}</span>
        </div>
        {isOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {item.children!.map((child) => (
              <SidebarItem key={child.path} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={handleItemClick}
      style={({ isActive }) => ({
        padding: `0.75rem 1rem 0.75rem ${paddingLeft}`,
        borderRadius: '8px',
        textDecoration: 'none',
        color: isActive ? '#fff' : 'var(--text-secondary)',
        backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
        fontWeight: 500,
        transition: 'background-color 0.2s',
        display: 'block'
      })}
    >
      {item.label}
    </NavLink>
  );
};

export const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector(state => state.ui);
  const { menus } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Debugging
  console.log('Sidebar rendering. Menus:', menus);

  const handleLogout = () => {
      dispatch(logout());
      navigate('/auth/login', { replace: true });
      window.location.reload(); // Force reload to clear any stale state
  };

  const menuList = menus || [];

  return (
    <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarClosed : ''}`}>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {menuList.length === 0 ? (
           <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
             <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                No menu items found.
             </p>
             <button 
               onClick={handleLogout}
               style={{
                 padding: '0.5rem 1rem',
                 backgroundColor: 'var(--primary-color)',
                 color: '#fff',
                 border: 'none',
                 borderRadius: '4px',
                 cursor: 'pointer'
               }}
             >
               Reload / Sign Out
             </button>
           </div>
        ) : (
          menuList.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))
        )}
      </nav>
    </aside>
  );
};
