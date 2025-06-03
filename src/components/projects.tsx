"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react';
import Link from 'next/link';

export const Projects = () => {

    const projects = [{
        title: 'Macbook Pro 2023',
        src:'https://aceternity.com/cdn-cgi/image/width=2048/https://assets.aceternity.com/macbook-scroll.png',
        href:'#',
        description: 'A powerful laptop designed for professionals and creatives, '
    },
{
        title: 'Macbook Pro 2024',
        src:'https://aceternity.com/cdn-cgi/image/width=2048/https://assets.aceternity.com/macbook-scroll.png',
        href:'#',
        description: 'An advanced laptop with enhanced graphics and processing capabilities,'
    },
    {
        title: 'Macbook Pro 2025',
        src:'https://aceternity.com/cdn-cgi/image/width=2048/https://assets.aceternity.com/macbook-scroll.png',
        href:'#',
        description: 'The latest iteration of the Macbook Pro, featuring cutting-edge technology '
    }
]



  return (

    <div className='py-10'>
        <p className='text-secondary max-w-lg pt-4 text-sm md:text-sm'>
        I love creating products and projects that solve real-world problems. Here are some of my recent projects:
        </p>
        <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2'>
        {projects.map((project, idx) => (
            <motion.div 
            initial ={{ opacity: 0, filter:"blur(10px)",y: 20 }}
            whileInView={{ opacity: 1, filter:"blur(0px)", y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1, ease: "easeInOut" }}

            key={project.title}
            className='group relative mb-4'
            >
             <Link href={project.href}>

               <Image src= {project.src} alt={project.title}
               height={300} width={300} className='group-hover:scale-[1.02] transition duration-200 rounded-xl object-cover w-full'
               />

                  <h2 className='z-20 mt-2 font-medium tracking-tight text-neutral-500 dark:text-neutral-400'>

                    {project.title}
                </h2>

                <p className='max-w-xs text-sm text-neutral-500 dark:text-neutral-400'>
                    {project.description}
                </p>
               </Link>
            </motion.div>
        ))}
        </div>
    </div>
  );
};
