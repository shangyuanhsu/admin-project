import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { BackToTop } from '../components/BackToTop/BackToTop';
import styles from './Layout.module.css';
import { useAppSelector, useAppDispatch } from '../stores/hooks';
import { closeSidebar } from '../stores/uiSlice';

export const MainLayout = () => {
  const { isSidebarOpen } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  // Auto-close sidebar on resize if screen becomes small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && isSidebarOpen) {
        dispatch(closeSidebar());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen, dispatch]);

  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      {/* Mobile Backdrop */}
      <div 
        className={`${styles.backdrop} ${isSidebarOpen ? styles.backdropVisible : ''}`} 
        onClick={() => dispatch(closeSidebar())}
      />
      <div className={`${styles.mainContent} ${!isSidebarOpen ? styles.mainContentExpanded : ''}`}>
        <main className={styles.pageContent}>
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};
