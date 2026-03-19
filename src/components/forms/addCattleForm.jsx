import { useState } from 'react';
import styles from '../../css/forms.module.css'

const AddCattleForm = ({ onSave, breeds, isLoading }) => {

    const [formData, setFormData] = useState({
        name: '',
        date_birthday: '',
        gender: 'female',
        breed_id: '',
        health_state: 'active',
        state_production: false
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
        // El hook useCattle se encargará del envío real
        onSave(formData);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.grid}>
                <div className={styles.field}>
                    <label>Animal Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Lola" />
                </div>

                <div className={styles.field}>
                    <label>Birth Date *</label>
                    <input type="date" name="date_birthday" required value={formData.date_birthday} onChange={handleChange} />
                </div>

                <div className={styles.field}>
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label>Breed *</label>
                    <select name="breed_id" required value={formData.breed_id} onChange={handleChange}>
                        <option value="">Select breed</option>
                        {breeds.map(b => (
                            <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label>Health State</label>
                    <select name="health_state" value={formData.health_state} onChange={handleChange}>
                        <option value="active">Active / Healthy</option>
                        <option value="sick">Sick / Treatment</option>
                        <option value="solid">Sold</option>
                    </select>
                </div>
 
                        <div className={styles.checkboxField}>
                            <input type="checkbox" name="state_production" id="prod" checked={formData.state_production} onChange={handleChange} />
                            <label htmlFor="prod">Currently in production (Milk)</label>
                        </div>

            </div>

            <button type="submit" className={styles.saveBtn} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Crear'}
            </button>
        </form>
    );
};

export default AddCattleForm;