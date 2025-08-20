import styles from './home.module.css';
import { useTranslation } from '../../i18n/LanguageContext';

//Images
import HomePortrait from '@assets/banners/HomePortrait.webp'
import HomeIMG from '@assets/backgrounds/AnimationBG.webp'
import HomeIMG2 from '@assets/backgrounds/AnimationBG.webp'
import SectionCard1 from '@assets/images/SectionCard_IMG1.webp';
import SectionCard2 from '@assets/images/SectionCard_IMG2.webp';
import SectionCard3 from '@assets/images/SectionCard_IMG3.webp';
import SectionCard4 from '@assets/images/SectionCard_IMG4.webp';
import SectionCard5 from '@assets/images/SectionCard_IMG5.png';

//Components
import SectionCardGroup from '@shared/SectionCardGroup/SectionCardGroup';
import Stats from '@shared/Stats/Stats';
import Contact from '@shared/Contact/Contact';
import ScrollSection from '@shared/ScrollSection/ScrollSection';
import ReverseScrollSection from '@shared/ReverseScrollSection/ReverseScrollSection';
import BlueSection from '@shared/BlueSection/BlueSection';
import WebinarBanner from '@shared/WebinarBanner/WebinarBanner';

export default function Home() {
  const { t } = useTranslation();

  const cards = [
    { 
      title: t('home.consulting.title'), 
      image: SectionCard4, 
      link: '#/consulting',
      description: t('home.consulting.description')
    },
    { 
      title: t('home.recruitment.title'), 
      image: SectionCard5, 
      link: '#/recruitment',
      description: t('home.recruitment.description')
    },
    { 
      title: t('home.safety.title'), 
      image: SectionCard3, 
      link: '#/safety',
      description: t('home.safety.description')
    },
    { 
      title: t('home.academy.title'), 
      image: SectionCard2, 
      link: '#/academy',
      description: t('home.academy.description')
    },
    { 
      title: t('home.flights.title'), 
      image: SectionCard1, 
      link: '#/flights',
      description: t('home.flights.description')
    },
  ];

  return (
    <div className={styles.container}>
      <WebinarBanner />
      <ScrollSection imageSrc={HomeIMG} altText="" />
      
      <ReverseScrollSection imageSrc={HomeIMG2} altText="" />

      <main className={styles.main}>
        <div>
          <SectionCardGroup cards={cards} />
        </div>

        
      </main>
      
      {/* <Stats /> */}
      <BlueSection />
      <Contact />
    </div>
  )
}