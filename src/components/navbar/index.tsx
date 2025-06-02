"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../container'

export const Navbar = () => {

    const navItems = [
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
        <nav className='flex items-center justify-between p-2'>
        <Image className='h-14 w-14 rounded-full' src="/pro-pic1.jpg" height="100" width="100" alt="Yash Picture"/>

        <div className='flex items-center'>
            {navItems.map((item, idx) => (
                <Link className='text-sm' href={item.href} key={idx}>
                    {item.title}
                </Link>
            ))}
        </div>
        </nav>
    </Container>
  )
}
