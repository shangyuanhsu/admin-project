import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import { logout } from '../../features/auth/authSlice';
import styles from './Layout.module.css'; // Use layout styles for avatar/userinfo
import menuStyles from './UserMenu.module.css'; // Specific menu styles

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={menuStyles.dropdownContainer} ref={menuRef}>
      <button 
        className={menuStyles.userButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={styles.userInfo}>
          <span>{user?.name || 'Guest'}</span>
          <div className={styles.avatar}>
            {getInitials(user?.name || '')}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className={menuStyles.menu}>
          <button 
            className={menuStyles.menuItem} 
            onClick={() => {
              console.log('Navigate to profile');
              setIsOpen(false);
            }}
          >
            Edit Profile
          </button>
          
          <div className={menuStyles.menuDivider} />
          
          <button 
            className={`${menuStyles.menuItem} ${menuStyles.logout}`} 
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
