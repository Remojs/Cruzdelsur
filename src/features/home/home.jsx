import styles from './home.module.css';

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

export default function Home() {

  const cards = [
    { 
      title: 'Consulting', 
      image: SectionCard4, 
      link: '#/consulting',
      description: 'Desde la idea hasta la implementación y seguimiento. Creamos y desarrollamos proyectos aeronáuticos con estrategia, innovación y un conocimiento profundo del mercado.'
    },
    { 
      title: 'Recruitment', 
      image: SectionCard5, 
      link: '#/recruitment',
      description: 'Campañas de reclutamiento / Diseño de Modelos y estrategias de optimización de procesos de selección.'
    },
    { 
      title: 'Safety', 
      image: SectionCard3, 
      link: '#/safety',
      description: 'Asesoría, Diseño, implementación y optimización de programas Gestión de riesgos de seguridad operacional en compañías de aviación. Auditamos, diagnosticamos y acompañamos la construcción de culturas organizacionales sólidas.'
    },
    { 
      title: 'Academy', 
      image: SectionCard2, 
      link: '#/academy',
      description: 'Experiencias de crecimiento y transformación a partir de programas de formación específica, Mentorías de construcción de perfil profesional / preparación estratégica de entrevistas en la búsqueda laboral.'
    },
    { 
      title: 'Flights', 
      image: SectionCard1, 
      link: '#/flights',
      description: 'Ofrecemos soluciones premium en vuelos privados de negocios, placer, medivac- logística aérea- y servicios de soporte, con enfoque en la seguridad, confidencialidad y calidad de excelencia en el servicio y detalle.'
    },
  ];

  return (
    <div className={styles.container}>
      <ScrollSection imageSrc={HomeIMG} altText="" />
      
      <ReverseScrollSection imageSrc={HomeIMG2} altText="" />

      <main className={styles.main}>
        <div>
          <h1 className={styles.sectionTitleCard}>Nuestro enfoque se despliega en cinco áreas clave</h1>
          <SectionCardGroup cards={cards} />
        </div>

        
      </main>
      
      {/* <Stats /> */}
      <BlueSection />
      <Contact />
    </div>
  )
}