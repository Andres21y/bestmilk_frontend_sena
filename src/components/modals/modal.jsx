import styles from '../../css/modal.module.css';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
           
            <div className={styles.md_content} onClick={e => e.stopPropagation()}>
                <header className={styles.header}>
                    <h3>{title}</h3>
                    <button className={styles.close_btn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </header>
                <section className={styles.body}>
                    {children}
                </section>
            </div>
        </div>
    );
};

export default Modal;