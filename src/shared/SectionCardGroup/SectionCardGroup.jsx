import React from 'react';
import SectionCard from '../SectionCard/SectionCard';
import styles from './SectionCardGroup.module.css';

export default function SectionCardGroup({ cards }) {
  return (
    <div className={styles.group}>
      {cards.map((card, index) => (
        <SectionCard 
          key={index} 
          title={card.title} 
          image={card.image} 
          link={card.link}
          index={index}
          description={card.description}
        />
      ))}
    </div>
  );
}
