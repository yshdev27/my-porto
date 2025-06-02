import React from 'react'
import Image from 'next/image'
import { Container } from '../container'

export const Navbar = () => {

    const navItemss = [
        {title: 'About',
        href: '/about'},

        {title: 'Projects',
        href: '/projects'},

        {title: 'Blog',
        href: '/blog'},

        {title: 'Contact',
        href: '/contact'
        },
    ];

  return (
    <Container>
        <div className='flex items-center justify-between'>
        <Image src="pro-pic1.jpg" height="100" width="100" alt="Yash Picture"/>
        </div>
    </Container>
  )
}
