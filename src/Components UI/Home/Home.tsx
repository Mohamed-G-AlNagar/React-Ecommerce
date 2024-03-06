import React, { useState } from 'react';
import Carousel from '../carousel/Carousel';
import Cards from '../cards/Cards';
import Filter from '../filter/Filter';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div className="container">
      <Carousel />;
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Cards selectedCategory={selectedCategory} />
    </div>
  );
}
