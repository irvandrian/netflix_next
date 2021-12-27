import Head from "next/head";
import Header from "../../components/Header";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";
import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
 

function Movie({ result }) {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const [loading, setLoading] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
     
    const index = result.videos.results.findIndex(
        (element) => element.type === "Trailer"
      );
    return (
        <div className="relative">
           <Head>
        <title>{result.title || result.original_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="relative z-50 bg-black/30">
          <div className="relative min-h-[calc(100vh-72px)] bg-black/30">
            <Image className="bg-black/30"
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              layout="fill"
              objectFit="cover"  alt=""
            />
            <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {result.title || result.original_name}
            </h1>
            <h4 className="text-sm md:text-lg max-w-4xl">{result.overview}</h4>
            <p className="text-xs md:text-sm">
              
              {result.genres?.map((genre) => genre.name + " ")}{" "}
            </p>
            <button
                className="text-[#f9f9f9]    flex items-center justify-center py-4 px-16 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              > <span className="tracking-wide">
              Play Now
            </span>
                <Image
                  src="/images/carbon_play-outline.png"
                  alt=""
                  className="h-10 md:h-10"
                  width={80}
        height={80}
                />
               
              </button>
              {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
          )}
           <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
           
            </div>
            </div>

          </div>
          </section>
          <h2 className="font-bold">Credits</h2>
          <div className="gap-10 row-gap-8 sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3 grid bg-top bg-cover mt-0
    mr-auto ml-auto ">
   <div className="flex bg-top bg-cover ">
    <Image
      src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500" className="h-20 w-20 rounded-full object-cover mr-4  shadow" width={80}
      height={80}  alt=""/>
    <div className="flex bg-top bg-cover flex-col justify-center ">
     <p className="font-bold text-lg ">Mac Xenon</p>
     <p className="text-sm mb-4  text-gray-800">Product Manager</p>
    </div>
   </div>
   <div className="flex bg-top bg-cover ">
    <Image 
      src="https://images.pexels.com/photos/1372134/pexels-photo-1372134.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500" className="h-20 w-20 rounded-full object-cover mr-4  shadow" width={80}
      height={80} alt=""/>
    <div className="flex bg-top bg-cover flex-col justify-center ">
     <p className="font-bold text-lg ">Martha Jena</p>
     <p className="text-sm mb-4  text-gray-800">Design Manager</p>
    </div>
   </div>
   </div>
        </div>
    )
}

export default Movie;

export async function getServerSideProps(context) {
  
    const { id } = context.query;
  
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
    ).then((response) => response.json());
  
    return {
      props: {
        
        result: request,
      },
    };
  }
