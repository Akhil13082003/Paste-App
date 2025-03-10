
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
      <Navbar></Navbar>
       <Home></Home>
      
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar></Navbar>
      <  Paste />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar></Navbar>
        <ViewPaste></ViewPaste>
      </div>
    },
    {
      path:"/edit/:pasteId",
      element:
      <div>
      <Navbar />
      <Home />
    </div>
    },
    {
      path:"/view/:pasteId",
      element:
      <div>
      <Navbar />
      <Home />
    </div>
    }
    
  ]
)
function App() {
  
  return (
   <div>
   <RouterProvider router = {router}/>

   </div>
  )
}

export default App
