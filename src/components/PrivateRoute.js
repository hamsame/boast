import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

const PrivateRoute = () => {
  const { loggedIn, checking } = useAuthStatus()

  if (checking) {
    return <h1>loading</h1>
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
