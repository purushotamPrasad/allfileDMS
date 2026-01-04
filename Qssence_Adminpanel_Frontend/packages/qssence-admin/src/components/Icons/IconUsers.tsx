import React from 'react';
import users from '../../asserts/images/users.svg';
import Image from 'next/image';
const IconUsers = () => {
    return <Image src={users} alt='icon'  height={20} width={20} color={"primary"}/>;
};
export default IconUsers;
