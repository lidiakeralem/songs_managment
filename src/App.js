import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
// import { WorkoutsContextProvider } from './context/WorkoutContext';

// Create the router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        {/* <WorkoutsContextProvider> */}
        <Navbar />
        <div className="pages">
          <Home />
        </div>
        {/* </WorkoutsContextProvider> */}
      </>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      {/* Use RouterProvider to provide the router to the application */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;