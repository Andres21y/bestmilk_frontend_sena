import { useAdminUsers } from '../hooks/useAdminUsers';
import styles from './UserManagement.module.css';

const UserManagement = () => {
    const { pendingUsers, loading, approveUser } = useAdminUsers();

    if (loading) return <p className={styles.loading}>Loading users...</p>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>User Approval</h2>
                <p className={styles.subtitle}>List of visitors waiting for access</p>
            </header>

            {pendingUsers.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No pending users at the moment.</p>
                </div>
            ) : (
                <div className={styles.listContainer}>
                    {pendingUsers.map(user => (
                        <div key={user._id} className={styles.userCard}>
                            <div className={styles.userInfo}>
                                <h3>{user.name} {user.last_name}</h3>
                                <p>{user.email}</p>
                                <span className={styles.nit}>NIT: {user.nit}</span>
                            </div>
                            <div className={styles.actions}>
                                <button 
                                    className={styles.approveBtn}
                                    onClick={() => approveUser(user._id)}
                                >
                                    Approve Access
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserManagement;