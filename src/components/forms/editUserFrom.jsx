import { useState } from 'react';
import styles from '../../css/forms.module.css';

const EditUserForm = ({ user, onSave, isLoading }) => {
    // Estado local con los datos actuales del usuario
    const [formData, setFormData] = useState({
        name: user.name || '',
        last_name: user.last_name || '',
        role: user.role || 'visitor',
        active: user.active || false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user._id, formData);
    };

    return (
        <form className={styles.edit_user_editForm} onSubmit={handleSubmit}>
            <div className={styles.edit_user_field}>
                <label>First Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.edit_user_field}>
                <label>Last Name</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>

            <div className={styles.edit_user_field}>
                <label>User Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="ADMIN">Administrator</option>
                    <option value="SUPERVISOR">Supervisor</option>
                    <option value="COLLABORATOR">Collaborator</option>
                    <option value="GUEST">Collaborator</option>
                </select>
            </div>

            <div className={styles.edit_user_checkboxField}>
                <input
                    type="checkbox"
                    name="active"
                    id="active_status"
                    checked={formData.active}
                    onChange={handleChange}
                />
                <label htmlFor="active_status">Account Active (Approved)</label>
            </div>

            <div className={styles.edit_user_infoBox}>
                <p>Email: <strong>{user.email}</strong></p>
                <p>NIT: <strong>{user.nit}</strong></p>
                <small>* Email and NIT cannot be changed for security reasons.</small>
            </div>

            <button type="submit" className={styles.edit_user_submitBtn} disabled={isLoading}>
                {isLoading ? 'Saving Changes...' : 'Update User'}
            </button>
        </form>
    );
};

export default EditUserForm;