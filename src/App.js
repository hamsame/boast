import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"

import Home from "../src/pages/Home"
import Explore from "../src/pages/Explore"
import Profile from "../src/pages/Profile"
import ForgotPassword from "../src/pages/ForgotPassword"
import SignIn from "../src/pages/SignIn"
import SignUp from "./pages/SignUp"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route to="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  )
}

export default App
