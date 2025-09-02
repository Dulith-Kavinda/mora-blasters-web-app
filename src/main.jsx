import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'


import Layout from './layout'
import Teams, { loader as TeamsLoader } from './components/teams'
import Info, { loader as InfoLoader } from './components/info'
import Home, { loader as HomeLoader } from './components/home'
import Register, { loader as RegisterLoader } from './components/register'
import GamePlane, { loader as GameLoader } from './components/game'
import SignOut, { loader as SignOutLoader } from './components/signout'
import NotFound from './components/notFound'
import Error from './components/error'
import AppWrapper from './AppWrapper'
import Tshirt,{loader as TshirtLoader} from './components/tshirt'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} errorElement={<Error />}>
    <Route element={<AppWrapper />}>
      <Route
        index
        element={<Home />}
        loader={HomeLoader}
        errorElement={<Error />}
      />
      <Route
        path='teams'
        element={<Teams />}
        loader={TeamsLoader}
        errorElement={<Error />}
      />
      <Route
        path='info'
        element={<Info />}
        loader={InfoLoader}
        errorElement={<Error />}
      />
      <Route
        path='registration'
        element={<Register />}
        loader={RegisterLoader}
        errorElement={<Error />}
      />
      <Route
        path='gameplane'
        element={<GamePlane />}
        loader={GameLoader}
        errorElement={<Error />}
      />
      <Route
        path='signout'
        element={<SignOut />}
        loader={SignOutLoader}
        errorElement={<Error />}
      />
      <Route
        path='tshirt'
        element={<Tshirt/>}
        loader={TshirtLoader}
        errorElement={<Error />}
      />
    </Route>
    <Route
      path='*'
      element={<NotFound />}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
