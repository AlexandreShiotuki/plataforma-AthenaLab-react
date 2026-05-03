import { useState } from 'react';
import { printingRecourses } from '../../data/printingRecourses'; 
import PartCard from '../../components/PrintingComponents/PartCard'; 
import styles from './styles.module.css';
import lupa from '../../assets/icons/lupa.svg'
import Printing3DViewer from '../../components/Printing3DViewer';

export default function PrintPage() {
    const [textoBusca, setTextoBusca] = useState('');
    const [openPart, setOpenPart] = useState(null); // selected part for 3D view

    const listaFiltrada = printingRecourses.filter(peca => 
        peca.name.toLowerCase().includes(textoBusca.toLowerCase())
    );

    function handleView3D(peca) {
        setOpenPart(peca);
    }

    function closeModal() {
        setOpenPart(null);
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <img src={lupa} alt="" className={styles.searchIcon} />
                <input 
                type="text"
                placeholder="Pesquisar peça..."
                className={styles.meuInputSimples}
                value={textoBusca}
                onChange={(e) => setTextoBusca(e.target.value)}
                />
            </div>


            <div className={styles.grid}>
                {listaFiltrada.map(peca => (
                    <PartCard key={peca.id} data={peca} onView3D={handleView3D} />
                ))}
            </div>

            {listaFiltrada.length === 0 && <p>Nenhuma peça encontrada.</p>}

            {/* Modal / Viewer overlay */}
            {openPart && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>{openPart.name}</h3>
                            <a href={openPart.downloadArchive} download className={styles.modalDownload}>Baixar</a>
                            <button className={styles.modalClose} onClick={closeModal}>Fechar</button>
                        </div>

                        <div className={styles.viewerWrapper}>
                            <Printing3DViewer src={openPart.downloadArchive} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}