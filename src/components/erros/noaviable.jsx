import styles from '../../css/errors.module.css';

const NotAvailable = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚧 Feature Coming Soon 🚧</h1>
      <p className={styles.message}>We’re currently working on it. Stay tuned!</p>
    </div>
  );
};

export default NotAvailable;
