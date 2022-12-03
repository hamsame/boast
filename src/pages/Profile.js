import React, { useState } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import Button from "@mui/material/Button"
import { blue, grey } from "@mui/material/colors"

const Profile = () => {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onSignout = () => {
    auth.signOut()
    navigate("/")
  }

  return (
    <>
      <Button
        type="submit"
        sx={[
          {
            backgroundColor: blue[500],
            color: grey[100],
            "&:hover": {
              backgroundColor: blue[700],
              color: grey[100],
            },
            mx: 1,
            mt: 2,
            mb: 5,
          },
        ]}
        onClick={() => onSignout()}
      >
        Logout
      </Button>
    </>
  )
}

export default Profile
