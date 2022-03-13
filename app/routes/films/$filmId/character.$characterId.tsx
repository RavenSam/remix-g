import { ErrorBoundaryComponent, LoaderFunction, useLoaderData, useCatch } from "remix"
import invariant from "tiny-invariant"
import { CharacterTypes, getFilmCharacter } from "~/api/films"

export const loader: LoaderFunction = ({ params }) => {
   invariant(params.characterId, "expected params.characterId")

   const character = getFilmCharacter(params.characterId)

   return character
}

export default function ChracterDetails() {
   const character = useLoaderData<CharacterTypes>()

   return (
      <div className="py-4 space-y-2">
         <h2 className="h3">Characters Details</h2>

         <div className="border shadow rounded-xl p-4">
            <h3 className="h4">{character.name}</h3>
            <ul className="py-2 text-gray-600 space-y-2">
               <li>Gender: {character.gender}</li>
               <li>Age: {character.age}</li>
               <li>Eye Color: {character.eye_color}</li>
               <li>Hair Color: {character.hair_color}</li>
            </ul>
         </div>
      </div>
   )
}

// ********************************************
// ERRORS THAT YOU EXPECT TO HAPPEN
export const CatchBoundary = () => {
   const caught = useCatch()

   if (caught.status === 404) {
      return (
         <div className="border border-orange-500 shadow rounded-xl p-4 bg-orange-200">
            <p>{caught.statusText}</p>
            <p>
               {caught.status} {caught.statusText}
            </p>
         </div>
      )
   }

   throw new Error("Unknown error")
}

// ********************************************
// UNEXPECTED ERRORS
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
   console.error(error)
   return (
      <div className="border border-red-500 shadow rounded-xl p-4 bg-red-300">
         <p>Oh... Sorry something went wrong!</p>
         <p>{error?.message}</p>
      </div>
   )
}
