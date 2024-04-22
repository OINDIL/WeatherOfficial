import './App.css';
import Homepage from './Components/Main Component/Homepage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { AuthProvider } from './Components/Context/AuthContext';
import Notes from './Components/Main Component/Notes';
import PrivateRouter from './Components/PrivateRoutes/PrivateRoute';
import Login from './Components/Small Components/Authentication/Login';
import Signup from './Components/Small Components/Authentication/Signup';

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<><Homepage/></>
    },
    {
      path:'/login',
      element:<>
        <Login/>
      </>
    },
    {
      path:'/signup',
      element:<>
        <Signup/>
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
