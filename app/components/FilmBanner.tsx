import { Link } from "remix"
import { FilmsTypes } from "~/api/films"

interface FilmBannerProps {
   film: FilmsTypes
}

export default function FilmBanner({ film }: FilmBannerProps) {
   return (
      <div className="relative p-2 w-full">
         <div className="absolute w-full flex flex-col justify-between h-full p-4 ">
            <Link
               to="/films"
               className="px-4 py-2 block w-fit bg-white bg-opacity-25 text-white font-bold shadow-sm rounded-full hover:bg-opacity-40"
            >{`<`}</Link>

            <h1 className="h2 w-fit shadow bg-white bg-opacity-40 px-4 rounded-xl">{film.title}</h1>
         </div>
         <figure className="">
            <img src={film.movie_banner} alt={film.title} className="w-full max-h-[60vh] object-cover rounded-xl" />
         </figure>
      </div>
   )
}
