import LoginPage from './pages/LoginPage'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter ([
  
    {
      path: '/',
      element: <LoginPage />,
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      )
    },
    
])
function App() {

  return <RouterProvider router={ router }/>
}
export default App;
