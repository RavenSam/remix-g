import { Link, NavLink } from "remix"
import { CharacterTypes } from "~/api/films"

interface CharacterProps {
   characters?: CharacterTypes[]
}

export default function CharacterList({ characters }: CharacterProps) {
   return (
      <div className="py-4 space-y-2 w-full max-w-md">
         <h2 className="h3">Characters</h2>

         <ul className="space-y-2">
            {characters?.map((character) => (
               <li key={character.id} className="">
                  <NavLink
                     prefetch="intent"
                     to={"character/" + character.id}
                     className={({ isActive }) =>
                        `shadow-sm rounded-xl w-full block p-4 cursor-pointer ${
                           isActive ? "bg-black text-white" : "hover:bg-gray-200 border"
                        }`
                     }
                  >
                     {character.name}
                  </NavLink>
               </li>
            ))}
         </ul>
      </div>
   )
}
