import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { RootLayout } from "@/components/layout/RootLayout"
import { NotFoundPage } from "@/pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import("@/pages/HomePage")
          return { Component: HomePage }
        },
      },
      // New pages go here: add a sibling object with its own `path`
      // (and a `lazy` loader, following the pattern above).
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter
