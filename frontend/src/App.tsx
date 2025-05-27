import Layout from "./components/pages/layout";
import { Footer } from "./components/pages/Footer";
import { Expenses } from "./components/pages/Expenses";
import { Incomes } from "./components/pages/Incomes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { RouterNav } from "./components/pages/RouterNav";
import { Home } from "./components/pages/Home";
import Page from "./components/pages/login";
import { useEffect, useState } from "react";

function App() {

  const [isAuthenticate, setIsAuthenticate] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticate(!!token);
  }, [])

  return (
    <>
      <BrowserRouter>
      {isAuthenticate && <Layout children={undefined}/> }
        <Routes>
          <Route path="/" element={<RouterNav />} >
            <Route path="/login" element={<Page />} />
            {isAuthenticate ? (
              <>
               <Route path="/home" element={<Home />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/home" replace />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      <div>
        {/* <Layout children={undefined} />   */}
        <Footer />
      </div>
    </>
  )
}

export default App;