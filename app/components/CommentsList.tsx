import { useEffect, useRef } from "react"
import { Form, useActionData, useTransition } from "remix"
import { CommentEntry } from "~/api/comments"

interface CommentProps {
   filmId: string
   comments: CommentEntry[]
}

export default function CommentsList({ filmId, comments }: CommentProps) {
   const actionData = useActionData()
   const { state } = useTransition()
   const formRef = useRef<HTMLFormElement>(null)

   useEffect(() => {
      if (state !== "submitting" && state !== "loading") {
         formRef.current?.reset()
      }
   }, [state])

   return (
      <div className="py-4 space-y-2 w-full">
         <h2 className="h3">Comments</h2>

         <ul className="space-y-2 w-full">
            {comments?.map((comment) => (
               <li key={comment.id} className="shadow-sm border rounded-xl w-full block p-4">
                  <h3 className="h4">{comment.name}</h3>
                  <p className="text-gray-600">{comment.message}</p>
               </li>
            ))}
         </ul>

         <div className="py-6 space-y-2 w-full">
            <h2 className="h3">Add a comment</h2>

            <Form ref={formRef} method="post" action={"/films/" + filmId}>
               <fieldset disabled={state !== "idle"} className="space-y-4">
                  <div className="flex flex-col space-y-2">
                     <label htmlFor="name" className="text-gray-700 text-sm font-semibold">
                        Name
                     </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        className={`${actionData?.errors.name && "border border-red-500"} input`}
                     />
                     {actionData?.errors.name && <p className="text-sm text-red-400">{actionData?.errors.name}</p>}
                  </div>

                  <div className="flex flex-col space-y-2">
                     <label htmlFor="message" className="text-gray-700 text-sm font-semibold">
                        Message
                     </label>
                     <textarea
                        id="message"
                        name="message"
                        className={`${actionData?.errors.message && "border-red-500"} input`}
                     ></textarea>
                     {actionData?.errors.message && (
                        <p className="text-sm text-red-400">{actionData?.errors.message}</p>
                     )}
                  </div>
                  <button type="submit" className="btn btn-1" disabled={state !== "idle"}>
                     {state === "idle" ? "Submit" : "loading"}
                  </button>
               </fieldset>
            </Form>
         </div>
      </div>
   )
}
