import { Container } from "@/components/container";
import FollowedArtists from "@/components/FollowedArtists";
import NowPlaying from "@/components/NowPlaying";
import {Projects} from "@/components/projects";
import TopTracks from "@/components/TopTracks";
import Image from "next/image";

export default function Home(){
    return (
    <div className="min-h-screen flex items-start justify-start">
        <Container className="min-h-[200vh] px-10 md:pt-20 md:pb-10">

        
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
            Hello there!
        </h1>
        <p className="text-secondary max-w-lg pt-4 text-sm md:text-sm">
            I'm a software engineer and designer based in India. I turn design into experiences and ideas into code. Currently, I lead the frontend team at Yahata
        </p>
        <Projects/>
        <NowPlaying/>
        <FollowedArtists/>
         <TopTracks/>
        </Container>
       
    </div>
    )} 