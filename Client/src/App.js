import './App.css';
import Homepage from './Components/Homepage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { AuthProvider } from './Components/Context/AuthContext';

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
