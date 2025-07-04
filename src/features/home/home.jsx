import styles from "./home.module.css"
import HomeIMG from '@assets/images/HomeSection.webp'
import HomePortrait from '@assets/banners/HomePortrait.webp'

export default function Home() {

  return (
    <div className={styles.container}>
      <img src={HomePortrait} alt="Aviation personnel walking through airport terminal" className={styles.portrait} loading="lazy"/>

      <main className={styles.main}>
        <div className={styles.contentGrid}>

          <div className={styles.imageColumn}>
            <img src={HomeIMG} alt="Aviation personnel walking through airport terminal" className={styles.heroImage} loading="lazy"/>
          </div>

          <div className={styles.contentColumn}>
            <h2 className={styles.sectionTitle}>What we offer</h2>

            <h3 className={styles.mainHeading}>Tailored Aviation & Talent Solutions for Latin America</h3>

            <div className={styles.textContent}>
              <p className={styles.paragraph}>Driven by strategic vision and deep market knowledge, Cruz del Sur combines world-class charter services with custom recruitment solutions for the aviation industry. Our mission is to deliver end-to-end support that elevates your operations and enhances every aspect of the flight and hiring experience.</p>

              <p className={styles.paragraph}>We act as strategic partners. Whether optimizing operations or sourcing the right talent, our goal is always the same: helping you grow with excellence and precision.</p>
            </div>

            <button className={styles.ctaButton}>READ MORE</button>
          </div>
        </div>

        <div className={styles.contentGridReversed}>

          <div className={styles.imageColumn}>
            <img src={HomeIMG} alt="Aviation personnel walking through airport terminal" className={styles.heroImage} loading="lazy"/>
          </div>

          <div className={styles.contentColumn}>
            <h2 className={styles.sectionTitle}>What we offer</h2>

            <h3 className={styles.mainHeading}>Tailored Aviation & Talent Solutions for Latin America</h3>

            <div className={styles.textContent}>
              <p className={styles.paragraph}>Driven by strategic vision and deep market knowledge, Cruz del Sur combines world-class charter services with custom recruitment solutions for the aviation industry. Our mission is to deliver end-to-end support that elevates your operations and enhances every aspect of the flight and hiring experience.</p>

              <p className={styles.paragraph}>We act as strategic partners. Whether optimizing operations or sourcing the right talent, our goal is always the same: helping you grow with excellence and precision.</p>
            </div>

            <button className={styles.ctaButton}>READ MORE</button>
          </div>
        </div>
      </main>
    </div>
  )
}