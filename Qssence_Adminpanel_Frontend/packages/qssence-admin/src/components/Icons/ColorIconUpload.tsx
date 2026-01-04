import React from 'react';
import upload from '../../asserts/images/upload.png';
import Image from 'next/image';
const ColorIconUpload = () => {
    return <Image src={upload} alt='icon'  height={30} width={30} color='lightgray'/>;
};
export default ColorIconUpload;
