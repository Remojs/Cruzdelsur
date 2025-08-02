import styles from './home.module.css';

//Images
import HomePortrait from '@assets/banners/HomePortrait.webp'
import HomeIMG from '@assets/images/HomeSection.webp'
import HomeIMG2 from '@assets/images/HomeSection2.webp'
import SectionCard1 from '@assets/images/SectionCard_IMG1.webp';
import SectionCard2 from '@assets/images/SectionCard_IMG2.webp';
import SectionCard3 from '@assets/images/SectionCard_IMG3.webp';
import SectionCard4 from '@assets/images/SectionCard_IMG4.webp';

//Components
import SectionCardGroup from '@shared/SectionCardGroup/SectionCardGroup';
import Stats from '@shared/Stats/Stats';
import Contact from '@shared/Contact/Contact';
import ScrollSection from '@shared/ScrollSection/ScrollSection';
import ReverseScrollSection from '@shared/ReverseScrollSection/ReverseScrollSection';
import BlueSection from '@shared/BlueSection/BlueSection';

export default function Home() {

  const cards = [
    { title: 'Flights', image: SectionCard1, link: '/charters' },
    { title: 'Learning', image: SectionCard2, link: '/learning' },
    { title: 'Safety', image: SectionCard3, link: '/safety' },
    { title: 'Recruitment', image: SectionCard4, link: '/recruitment' },
  ];

  return (
    <div className={styles.container}>
      <ScrollSection imageSrc="/src/assets/backgrounds/Animation-BG.webp" altText="Cruz del Sur Aviation"/>
      
      <ReverseScrollSection imageSrc="/src/assets/backgrounds/Animation-BG.webp" altText="Cruz del Sur Mission"/>

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