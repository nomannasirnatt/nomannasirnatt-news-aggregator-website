"use client"
import Link from "next/link";
import Image from "next/image";
import images from "@/assets/assets";
import { useRouter } from 'next/navigation'


const Home: React.FC<{}> = () => {
  const router = useRouter();
  return (
    <main className="main flex items-center justify-center h-screen relative">
    
      <Image
        src={images.backgroundImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="relative z-10 flex flex-col items-center justify-center col-span-12">
            <div className="get-started px-4 py-24 bg-dark rounded-lg border border-post border-solid border-1 text-center">
              <h1 className="text-greenish text-4xl md:text-5xl mb-8 uppercase italic font-extrabold p-3">
                Get your Favourite Article
              </h1>
              <Link
                href="/news"
                className="spin text-xl text-white bg-id py-3 px-8 bg-lightGreen font-bold rounded-md hover:bg-dark border hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
