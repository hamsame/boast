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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const { email, password } = formData
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log(user.uid)
      setTimeout(() => {
        navigate("/profile")
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container sx={{ width: 0.9, my: 2, mx: 0.1 }}>
      <h1>Sign In</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
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
          onClick={(e) => handleSubmit(e)}
        >
          Sign In
        </Button>
      </Box>
      <br />
      <Link to="/forgot-password">Forgot Password?</Link>
      <br />
      <br />
      <br />
      <Link to="/sign-up">Not A User? Signup Instead</Link>
    </Container>
  )
}

export default SignIn
