import styles from "./styles.module.css"

export default function PartCard({ data, onView3D }) {
    return (
        <div className={styles.card}>
            {/* PARTE SUPERIOR: Imagem e Tag */}
            <div className={styles.imageContainer}>
                {/* A tag no canto superior direito */}
                <span className={styles.categoryBadge}>
                    {data.category || "Geral"}
                </span>
                
                <img src={data.image} alt={data.name} className={styles.image} />
            </div>

            {/* PARTE INFERIOR: Textos e Botões */}
            <div className={styles.contentContainer}>
                <h2 className={styles.title}>{data.name}</h2>
                <p className={styles.description}>
                    {data.description || "Descrição da peça não disponível."}
                </p>

                <div className={styles.buttonGroup}>
                    {/* Botão Baixar (Borda Neon) */}
                    <a href={data.downloadArchive} download className={styles.downloadButton}>
                        Baixar arquivo
                    </a>
                    
                    {/* Botão Ver em 3D (Gradiente) */}
                    <button className={styles.view3dButton} onClick={() => onView3D && onView3D(data)}>
                        Ver em 3D
                    </button>
                </div>
            </div>
        </div>
    )
}