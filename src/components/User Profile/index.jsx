import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import styles from './styles.module.css';
import defaultAvatar from '../../assets/may-icon.webp';
import ModalAlterarNome from '../ModalAlterarNome';
import { useGamification } from '../context/GamificationContext';

// Remova as props que ele recebia antes, agora ele pega direto do contexto
export default function UserProfile() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { user, userId, refreshUserProfile } = useGamification();

    const handleCloseModal = async () => {
        setIsEditOpen(false);
        await refreshUserProfile();
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            window.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Calcula o XP necessário para passar do nível atual para o próximo
    const getXpRequiredForLevel = (level) => {
        return Math.ceil(100 * Math.pow(1.5, level - 1));
    };

    const xpRequired = getXpRequiredForLevel(user.level);
    const progressPercentage = Math.min((user.xp / xpRequired) * 100, 100);

    return (
        <>
            <div className={styles.profileContainer} ref={dropdownRef}>
                <button
                    type="button"
                    className={styles.profileTrigger}
                    onClick={() => setIsDropdownOpen((current) => !current)}
                    aria-haspopup="menu"
                    aria-expanded={isDropdownOpen}
                >
                    <div className={styles.info}>
                        <span className={styles.name}>{user.name || 'Aluno Athena'}</span>
                        <div className={styles.levelRow}>
                            <span className={styles.levelBadge}>Lvl. {user.level}</span>
                            <div className={styles.xpTrack}>
                                <div
                                    className={styles.xpFill}
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <img
                        src={user.avatarUrl || defaultAvatar}
                        alt="Perfil"
                        className={styles.avatar}
                    />
                </button>

                {isDropdownOpen && (
                    <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.dropdownItem}
                            onClick={() => {
                                setIsEditOpen(true);
                                setIsDropdownOpen(false);
                            }}
                        >
                            Alterar nome
                        </button>
                        <button
                            type="button"
                            className={styles.dropdownItem}
                            onClick={handleSignOut}
                        >
                            Encerrar sessão
                        </button>
                    </div>
                )}
            </div>

            {isEditOpen && (
                <ModalAlterarNome
                    userId={userId}
                    nomeAtual={user.name}
                    dataUltimaAlteracao={user.lastNameChange}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}