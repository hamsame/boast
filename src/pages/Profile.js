import { getAuth, updateProfile } from "firebase/auth"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"

import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Input from "@mui/material/Input"
import { red, grey, blue } from "@mui/material/colors"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import DoneIcon from "@mui/icons-material/Done"

const Profile = () => {
  const navigate = useNavigate()
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData

  const onChange = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const onSignout = () => {
    auth.signOut()
    navigate("/")
  }

  const pageMargin = {
    width: 0.8,
    mx: "auto",
    my: "2vh",
  }

  const handleSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // update display name in firestore
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, { name })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const changeDetailStyle = [
    {
      gridColumn: 2,
      color: grey[900],
      "&:hover": {
        color: grey[700],
      },
    },
  ]

  return (
    <Box sx={{ background: "white", ...pageMargin }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <h1>My Profile</h1>
        <Button
          type="submit"
          sx={[
            {
              width: 1 / 4,
              backgroundColor: red[500],
              color: grey[100],
              "&:hover": {
                backgroundColor: red[300],
                color: grey[100],
              },
              mx: 1,
              mt: 2,
              mb: 5,
            },
          ]}
          onClick={onSignout}
        >
          Logout
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
          }}
          onClick={() => {
            changeDetails && handleSubmit()
            setChangeDetails(!changeDetails)
          }}
        >
          <p>{!changeDetails ? "Edit Profile" : "Done"}</p>
          {!changeDetails ? (
            <ModeEditIcon sx={changeDetailStyle} />
          ) : (
            <DoneIcon sx={changeDetailStyle} />
          )}
        </Box>
      </Box>
      <main>
        <Box
          sx={{
            width: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              type="name"
              value={name}
              onChange={onChange}
              disabled={!changeDetails}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={onChange}
              disabled={true}
            />
          </FormControl>
        </Box>
      </main>
    </Box>
  )
}

export default Profile
