import { useAuth } from '../context/authContext';
import { useUser } from '../hooks/useUser';
import styles from '../css/users.module.css'
import { FaSpinner, FaTrash, FaUserEdit } from 'react-icons/fa';
import { useState } from 'react';
import Modal from '../components/modals/modal'
import EditUserForm from './forms/editUserFrom';

const UsersTable = () => {
    const { users, loading, removeUser, editUser } = useUser();
    const { userData } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Verificamos si es administrador para mostrar/ocultar acciones críticas
    const isAdmin = userData?.user?.rol === 'ADMIN';

    if (loading) return (
        <div className={styles.loader}>
            <FaSpinner className={styles.spin} />
            <p>Loading data from database...</p>
        </div>
    );

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };
    const handleSaveUpdate = async (id, data) => {
        const success = await editUser(id, data);
        if (success) setIsEditModalOpen(false); // Cerramos el modal si se guardó bien
    };

    return (
        <div className={styles.container}>
            <header className={styles.table_header}>
                <h2 className={styles.title}>Personas</h2>
                <p className={styles.count}>Total de Usuarios {users.length - 1}</p>
            </header>

            <div className={styles.responsive_wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th className={styles.hideMobile}>NIT</th>
                            <th>Status</th>
                            {isAdmin && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody className={styles.t_body}>
                        {users.map(user => (
                            <tr key={user._id} className={styles['field']}>
                                <td data-label="Name">
                                    <div className={styles.nameCell}>
                                        <span className={styles.avatarMini}>{user.name.charAt(0)}</span>
                                        {user.name} {user.last_name}
                                    </div>
                                </td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="NIT" className={styles.hideMobile}>{user.nit}</td>
                                <td data-label="Status">
                                    <span className={user.state ? styles.activeBadge : styles.pendingBadge}>
                                        {user.state ? 'ACTIVE' : 'PENDING'}
                                    </span>
                                </td>

                                {isAdmin && (
                                    <td data-label="Actions" className={styles.actions}>
                                        {/* Solo el admin ve estos botones */}
                                        <button
                                            className={styles.editBtn}
                                            title="Edit user"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            <FaUserEdit />
                                        </button>
                                        <button
                                            className={styles.deleteBtn}
                                            title="Delete user"
                                            onClick={() => {
                                                if (window.confirm("Are you sure?")) removeUser(user._id)
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="Edit Personnel Information"
                >
                    {selectedUser && (
                        <EditUserForm
                            user={selectedUser}
                            onSave={handleSaveUpdate}
                            isLoading={loading}
                        />
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default UsersTable;