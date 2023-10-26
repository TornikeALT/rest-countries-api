import RootLayout from "./UI/RooyLayout";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";
import Mode from "./components/Mode";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "./context/ThemeContext";

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
    <ThemeProvider>
      <RouterProvider router={router}>
        <Mode />
        <Countries />
      </RouterProvider>
    </ThemeProvider>
  )
}

export default App;
