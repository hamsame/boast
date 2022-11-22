import * as React from "react"
import HomeIcon from "@mui/icons-material/Home"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Person2Icon from "@mui/icons-material/Person2"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate, useLocation } from "react-router-dom"
import { grey } from "@mui/material/colors"

const Navbar = () => {
  const activeNavButton = grey[900]
  const navigate = useNavigate()
  const location = useLocation()
  const pathSameAsRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <footer>
      <BottomNavigation>
        <BottomNavigationAction
          label="Home"
          icon={
            <HomeIcon
              sx={
                pathSameAsRoute("/")
                  ? { color: activeNavButton }
                  : { color: grey[500] }
              }
            />
          }
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          label="Explore"
          icon={
            <SearchIcon
              sx={
                pathSameAsRoute("/explore")
                  ? { color: activeNavButton }
                  : { color: grey[500] }
              }
            />
          }
          onClick={() => navigate("/explore")}
        />
        <BottomNavigationAction
          label="Profile"
          icon={
            <Person2Icon
              sx={
                pathSameAsRoute("/profile")
                  ? { color: activeNavButton }
                  : { color: grey[500] }
              }
            />
          }
          onClick={() => navigate("/profile")}
        />
      </BottomNavigation>
    </footer>
  )
}

export default Navbar
