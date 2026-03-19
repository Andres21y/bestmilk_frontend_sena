import { useState } from 'react';
import { useCattle } from '../hooks/useCattle';
import { useBreeds } from '../hooks/useBreed';
import { useAuth } from '../context/authContext';
import styles from '../css/cattle.module.css';
import { FaEdit, FaTrash, FaPlus, FaVenus, FaMars, FaSearch } from 'react-icons/fa';
import Modal from './modals/modal';
import AddCattleForm from './forms/addCattleForm';

const CattleList = () => {
    // Hooks de lógica
    const { cattles, loading, addCattle, removeCattle } = useCattle();
    const { breeds } = useBreeds();
    const { userData } = useAuth();
    console.log('cattle===>', cattles);
 

    // Estados locales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Permisos
    const isAdmin = userData?.user?.rol === 'ADMIN';

    // Filtrado de búsqueda (Mobile friendly)
    const filteredCattle = cattles?.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSaveAnimal = async (formData) => {
        await addCattle(formData);
        setIsModalOpen(false); // Cerrar tras guardar
    };

    if (loading && cattles?.length === 0) return <div className={styles.loader}>Loading Cattle...</div>;

    const item = breeds.find((obj) => obj.id === cattles.breed_id);
   


    return (
        <div className={styles.container}>
            {/* Cabecera y Buscador */}
            <header className={styles.header}>
                <div className={styles.title_header}>
                    <h2>Cattle Inventory</h2>
                    <p>Total de animales: # {cattles?.length}</p>
                </div>
                <button className={styles.add_btn} onClick={() => setIsModalOpen(true)}>
                    <FaPlus /> <span className={styles.hideMobile}>Add New</span>
                </button>
            </header>

            <div className={styles.search_bar}>
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Listado en Grid (Mobile First) */}
            {filteredCattle?.length === 0 ? (
                <div className={styles.empty}>No animals found.</div>
            ) : (
                <div className={styles.grid}>
                    {filteredCattle?.map((animal) => (
                        <div key={animal._id} className={styles.card}>
                            <div className={styles.card_header}>
                                <span className={styles.tag}>ID: {animal._id.slice(-5)}</span>
                                {animal.gender === 'female' ?
                                    <FaVenus className={styles.femaleIcon} /> :
                                    <FaMars className={styles.maleIcon} />
                                }
                            </div>

                            <div className={styles.card_body}>
                                <h3>{animal.name}</h3>
                                <p><strong>Breed:</strong> {item ? item.name : 'General'}</p>
                                <p><strong>Status:</strong>
                                    <span className={styles[animal.health_state]}> {animal.health_state}</span>
                                </p>
                            </div>

                            <div className={styles.card_actions}>
                                <button className={styles.history_btn}>View History</button>

                                {isAdmin && (
                                    <div className={styles.admin_actions}>
                                        <button className={styles.editBtn} title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button
                                            className={styles.deleteBtn}
                                            title="Delete"
                                            onClick={() => window.confirm('Delete animal permanently?') && removeCattle(animal._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para Registrar */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Register New Cattle"
            >
                <AddCattleForm
                    breeds={breeds}
                    onSave={handleSaveAnimal}
                    isLoading={loading}
                />
            </Modal>
        </div>
    );
};

export default CattleList;