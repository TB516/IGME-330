import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Navbar from './components/Navbar.tsx';
import About from './pages/About.tsx';
import ShipFinder from './pages/ShipFinder.tsx';

import 'bulma/css/bulma.min.css';

const router = createHashRouter([{
  path: "/",
  element: <Navbar />,
  children: [
    {
      index: true,
      element: <About />
    },
    {
      path: "ships",
      element: <ShipFinder />
    }
  ]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
