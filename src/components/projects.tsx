import React from 'react'
import Image from 'next/image'

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
            <div key={project.title}>
               <Image src= {project.src} alt={project.title}
               height={300} width={300} className='h-72 rounded-xl object-cover w-full'
               />
            </div>
        ))}
        </div>
    </div>
  );
};
