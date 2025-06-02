"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react';

export const Projects = () => {

    const projects = [{
        title: 'Macbook Pro 2023',
        src:'https://aceternity.com/cdn-cgi/image/width=2048/https://assets.aceternity.com/macbook-scroll.png',
        href:'#',
    },
{
        title: 'Macbook Pro 2024',
        src:'https://aceternity.com/cdn-cgi/image/width=2048/https://assets.aceternity.com/macbook-scroll.png',
        href:'#',
    },
    {
        title: 'Macbook Pro 2025',
        src:'https://aceternity.com/cdn-cgi/image/width=2048/https://assets.aceternity.com/macbook-scroll.png',
        href:'#',
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
            className='group relative'
            >
                <h2 className='absolute bottom-2 left-2 z-20 text-black dark:text-white'>

                    {project.title}
                </h2>

               <Image src= {project.src} alt={project.title}
               height={300} width={300} className='h-72 group-hover:blur-[2px] transition duration-200 rounded-xl object-cover w-full'
               />
            </motion.div>
        ))}
        </div>
    </div>
  );
};
