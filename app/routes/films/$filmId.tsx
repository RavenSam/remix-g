import { ActionFunction, LoaderFunction, MetaFunction, Outlet, redirect, useLoaderData } from "remix"
import { getFilmById, FilmsTypes } from "~/api/films"
import invariant from "tiny-invariant"
import FilmBanner from "~/components/FilmBanner"
import CharacterList from "~/components/CharacterList"
import CommentsList from "~/components/CommentsList"
import { addComment, CommentEntry } from "~/api/comments"

export const action: ActionFunction = async ({ request, params }) => {
   invariant(params.filmId, "expected params.filmId")

   const body = await request.formData()

   const comment: CommentEntry = {
      name: body.get("name") as string,
      message: body.get("message") as string,
      filmId: params.filmId,
   }

   const errors = { name: "", message: "" }

   if (!comment.name) {
      errors.name = "Please provide your name"
   }

   if (!comment.message) {
      errors.message = "Please provide a comment"
   }

   if (errors.name || errors.message) {
      const values = Object.fromEntries(body)
      return { errors, values }
   }

   await addComment(comment)

   return redirect("/films/" + params.filmId)
}

export const loader: LoaderFunction = async ({ params }) => {
   invariant(params.filmId, "expected params.filmId")

   const film = getFilmById(params.filmId)

   return film
}

export default function Film() {
   const film = useLoaderData<FilmsTypes>()

   return (
      <div className="overflow-x-hidden">
         <FilmBanner film={film} />

         <div className="max-w-5xl mx-auto w-full px-4">
            <div className="py-4 space-y-2">
               <h2 className="h3">Description</h2>
               <p className="text-gray-600">{film.description}</p>
            </div>

            <div className="flex space-x-5">
               <CharacterList characters={film.characters} />

               <div className="flex-1">
                  <Outlet />

                  <CommentsList comments={film.comments || []} filmId={film.id} />
               </div>
            </div>
         </div>
      </div>
   )
}

export const meta: MetaFunction = ({ data }: { data: FilmsTypes }) => {
   return { title: data.title, description: data.description }
}
