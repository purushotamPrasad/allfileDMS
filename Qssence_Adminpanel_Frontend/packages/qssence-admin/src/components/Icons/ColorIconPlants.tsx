import React from 'react';
import plants from '../../asserts/images/plants.png';
import Image from 'next/image';
const ColorIconPlants = () => {
    return <Image src={plants} alt='icon'  height={26} width={26}/>;
};
export default ColorIconPlants;
