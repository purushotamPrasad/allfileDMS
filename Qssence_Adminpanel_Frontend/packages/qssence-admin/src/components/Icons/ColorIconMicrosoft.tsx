import React from 'react';
import IconMicrosoft from '../../asserts/images/ColorIconMicrosoft.png';
import Image from 'next/image';
const ColorIconMicrosoft = () => {
    return <Image src={IconMicrosoft} alt='icon'  height={24} width={24} style={{paddingRight: 4}}/>;
};
export default ColorIconMicrosoft;