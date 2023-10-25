import RootLayout from "./UI/RooyLayout";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";
import Mode from "./components/Mode";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: "/country/:countryName",
        element: <CountryDetail />
      }
    ]
  }
])


function App() {

  return (
    <RouterProvider router={router}>
      <Mode />
      <Countries />
    </RouterProvider>
  )
}

export default App;
