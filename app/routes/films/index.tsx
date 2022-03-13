import { LoaderFunction, MetaFunction, useLoaderData, Form, useTransition, Link } from "remix"
import { getFilms, FilmsTypes } from "~/api/films"

export const loader: LoaderFunction = async ({ request }) => {
   const url = new URL(request.url)
   const title = url.searchParams.get("title")

   return getFilms(title)
}

export default function FilmsIndex() {
   const films = useLoaderData<FilmsTypes[]>()
   const { state } = useTransition()

   return (
      <div className="max-w-6xl mx-auto px-4 font-sans">
         <h1 className="h1 py-4">Studio GhibliFilms</h1>

         <div className="">
            <Form className="space-x-2 py-5">
               <input type="search" placeholder="Search title" className="input" name="title" />
               <button type="submit" className="btn btn-1" disabled={state !== "idle"}>
                  {state === "idle" ? "Search" : "loading"}
               </button>
            </Form>
         </div>

         <div className="films-grid grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] my-4 gap-4 md:gap-8 md:my-8">
            {films.map((film) => (
               <Link
                  to={film.id}
                  key={film.id}
                  title={film.title}
                  className="film-card relative cursor-pointer group max-w-md"
                  prefetch="intent"
               >
                  <figure className="w-full rounded-xl overflow-hidden shadow">
                     <img
                        src={film.image}
                        alt={film.title}
                        className="max-w-full group-hover:scale-110 transition duration-300"
                     />
                  </figure>
                  <div className="absolute w-full bottom-0 left-0 p-1 ">
                     <div className="rounded-xl bg-white bg-opacity-80 text-black p-4">
                        <h2 title={film.title} className="h4 truncate">
                           {film.title}
                        </h2>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}

export const meta: MetaFunction = () => {
   return { title: "Films | Studio G", description: "list of films" }
}
