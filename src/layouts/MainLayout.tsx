import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { BackToTop } from '../components/BackToTop/BackToTop';
import styles from './Layout.module.css';
import { useAppSelector } from '../stores/hooks';

export const MainLayout = () => {
  const { isSidebarOpen } = useAppSelector(state => state.ui);

  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
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
