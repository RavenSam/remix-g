import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix"
import type { MetaFunction, LinksFunction, ErrorBoundaryComponent } from "remix"
import styles from "./tailwind.css"

export const meta: MetaFunction = () => {
   return { title: "Studio G" }
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

export default function App() {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <Meta />
            <Links />
         </head>
         <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
         </body>
      </html>
   )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
   console.error(error)
   return (
      <html>
         <head>
            <title>Oh no!</title>
            <Meta />
            <Links />
         </head>
         <body>
            {/* add the UI you want your users to see */}
            {error.message}
            <Scripts />
         </body>
      </html>
   )
}
