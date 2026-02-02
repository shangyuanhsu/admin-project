import { useAppDispatch } from '../stores/hooks';
import { toggleSidebar } from '../stores/uiSlice';
import styles from './Layout.module.css';
import { UserMenu } from './UserMenu';

export const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button 
          className={styles.menuButton} 
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle Side Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className={styles.companyName}>THP</div>
      </div>
      <UserMenu />
    </header>
  );
};
