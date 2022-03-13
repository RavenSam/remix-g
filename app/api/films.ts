import { CommentEntry, getComments } from "./comments"

export interface FilmsTypes {
   id: string
   title: string
   original_title: string
   original_title_romanised: string
   image: string
   movie_banner: string
   description: string
   director: string
   producer: string
   release_date: string
   running_time: string
   rt_score: string
   species: string[]
   locations: string[]
   vehicles: string[]
   url: string
   people: string[]
   characters?: CharacterTypes[]
   comments: CommentEntry[]
}

export interface CharacterTypes {
   id: string
   name: string
   gender?: string
   age?: string
   eye_color?: string
   hair_color?: string
   films: string[]
   species?: string
   url?: string
}

export async function getFilms(title?: string | null) {
   const response = await fetch(`https://ghibliapi.herokuapp.com/films`)
   const films: FilmsTypes[] = await response.json()

   return films.filter((film) => (title ? film.title.toLowerCase().includes(title.toLowerCase()) : true))
}

export async function getFilmById(id: string) {
   const response = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`)
   const film: FilmsTypes = await response.json()

   const characters = await Promise.all(
      film.people
         .filter((url) => url !== `https://ghibliapi.herokuapp.com/people/`)
         .map((url) => fetch(url).then((res) => res.json()))
   )

   const comments = await getComments(id)

   return { ...film, characters, comments }
}

export async function getFilmCharacter(characterId: string): Promise<CharacterTypes> {
   const response = await fetch(`https://ghibliapi.herokuapp.com/people/${characterId}`)

   if (!response.ok) {
      throw response
   }

   return response.json()
}
