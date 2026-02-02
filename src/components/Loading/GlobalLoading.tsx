import styles from './GlobalLoading.module.css';

export const GlobalLoading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
};
