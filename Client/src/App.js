import './App.css';
import Homepage from './Components/Main Component/Homepage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { AuthProvider } from './Components/Context/AuthContext';
import Notes from './Components/Main Component/Notes';
import PrivateRouter from './Components/PrivateRoutes/PrivateRoute';

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<><Homepage/></>
    },
    {
      path:'/login',
      element:<>
        hello this is login
      </>
    },
    {
      path:'/notes',
      element:<PrivateRouter><Notes/></PrivateRouter>
    }
  ])
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </>
  );
}

export default App;
