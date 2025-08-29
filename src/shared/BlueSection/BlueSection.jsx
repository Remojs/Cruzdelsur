import { useTranslation } from '../../i18n/LanguageContext';
import styles from './BlueSection.module.css';
import BlueSectionImg from '@assets/images/Bluesectionimg.png';
import BlueSectionImg2 from '@assets/images/Bluesectionimg2.png';

export default function BlueSection() {
  const { t } = useTranslation();
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
          <h2 className={styles.title}>{t('blueSection.title')}</h2>
          
          <ul className={styles.defineList}>
            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>{t('blueSection.principle1.title')}</strong>
              <span className={styles.defineDescription}>
                {t('blueSection.principle1.description')}
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>{t('blueSection.principle2.title')}</strong>
              <span className={styles.defineDescription}>
                {t('blueSection.principle2.description')}
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>{t('blueSection.principle3.title')}</strong>
              <span className={styles.defineDescription}>
                {t('blueSection.principle3.description')}
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>{t('blueSection.principle4.title')}</strong>
              <span className={styles.defineDescription}>
                {t('blueSection.principle4.description')}
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>{t('blueSection.principle5.title')}</strong>
              <span className={styles.defineDescription}>
                {t('blueSection.principle5.description')}
              </span>
            </li>

            <li className={styles.defineItem}>
              <strong className={styles.defineTitle}>{t('blueSection.principle6.title')}</strong>
              <span className={styles.defineDescription}>
                {t('blueSection.principle6.description')}
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Nueva sección - Invitación a volar más alto */}
      <div className={styles.invitationSection}>
        <div className={styles.invitationContent}>
          <div className={styles.invitationTextContainer}>
            <h2 className={styles.invitationTitle}>{t('blueSection.invitation.title')}</h2>
            
            <div className={styles.invitationText}>
              <p>
                {t('blueSection.invitation.text')}
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
