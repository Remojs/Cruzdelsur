import styles from './BlueSection.module.css';
import BlueSectionImg from '@assets/images/Bluesectionimg.png';
import BlueSectionImg2 from '@assets/images/Bluesectionimg2.png';

export default function BlueSection() {
  return (
    <section className={styles.blueSection}>
      <div className={styles.gradientOverlay}></div>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img 
            src={BlueSectionImg} 
            alt="Blue Section Image" 
            className={styles.sectionImage}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Lo que nos define:</h2>
          
          <ul className={styles.defineList}>
            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>Rigurosidad operativa + sensibilidad cultural</strong>
              <span className={styles.defineDescription}>
                Porque la excelencia técnica no tiene sentido sin un entendimiento profundo de las personas y los contextos.
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>Escucha activa + pensamiento estratégico</strong>
              <span className={styles.defineDescription}>
                Porque no creemos en soluciones enlatadas. Cada cliente es único, y cada proyecto también debe serlo.
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>Red global + conocimiento local</strong>
              <span className={styles.defineDescription}>
                Porque trabajamos a nivel global, pero buscamos el valor estratégico y particular de lo que se construye en cada lugar.
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>Visión de futuro + ejecución viable</strong>
              <span className={styles.defineDescription}>
                Porque acompañamos procesos de transformación con herramientas concretas, innovadoras y prácticas.
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>Pensamiento creativo + innovación con propósito</strong>
              <span className={styles.defineDescription}>
                Porque innovar no es solo pensar en algo nuevo, sino desafiar lo establecido y crearlo. Y cada solución nace de una mirada original aplicada con el propósito de adelantarse y dejar huella de referencia futura.
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>Compromiso genuino + respeto</strong>
              <span className={styles.defineDescription}>
                Porque detrás de cada departamento, perfil, cada operación y cada decisión, hay personas reales, con historias, talentos y sueños que merecen ser escuchados y potenciados.
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Nueva sección - Invitación a volar más alto */}
      <div className={styles.invitationSection}>
        <div className={styles.invitationContent}>
          <div className={styles.invitationTextContainer}>
            <h2 className={styles.invitationTitle}>Una invitación a volar más alto</h2>
            
            <div className={styles.invitationText}>
              <p>
                En Cruz del Sur no creemos en los límites estáticos. Creemos en el dinamismo del vuelo, en el movimiento, en la expansión y en la posibilidad de crear nuevos estándares para la industria, a partir del compromiso profesional direccionado a la concreción de objetivos de alto impacto.<br />
                Por eso, este no es solo un texto institucional.<br />
                Es una invitación; es una puerta que se abre; el inicio de una alianza, de un proyecto, de un camino que invita a dar pasos.
              </p>
            </div>
          </div>
          
          <div className={styles.invitationImageContainer}>
            <img 
              src={BlueSectionImg2} 
              alt="Cruz del Sur - Inspiring Aviation" 
              className={styles.invitationImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
