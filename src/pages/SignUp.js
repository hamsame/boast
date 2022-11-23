import React, { useState } from "react"
// mui imports
import { blue, grey } from "@mui/material/colors"
// mui Containers
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
// mui icons
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
// mui form
import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import Button from "@mui/material/Button"

// react router import
import { Link, useNavigate } from "react-router-dom"

// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"

const SignUp = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formData.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, "users", user.uid), formDataCopy)

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container sx={{ width: 0.9, my: 2, mx: 0.1 }}>
      <h1>Sign Up</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" type="name" value={name} onChange={onChange} />
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="email" value={email} onChange={onChange} />
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
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
          onClick={() => handleSubmit()}
        >
          Sign Up
        </Button>
      </Box>
      <br />

      <Link to="/sign-in">Sign In Instead</Link>
    </Container>
  )
}

export default SignUp
