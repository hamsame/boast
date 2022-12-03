import React, { useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

// mui imports
import Button from "@mui/material/Button"
import { FormControl } from "@mui/material"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import Box from "@mui/material/Box"
import { blue, grey } from "@mui/material/colors"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.log(error)
    }
  }

  const pageMargin = {
    width: 0.8,
    mx: "auto",
    my: "2vh",
  }

  return (
    <>
      <Box sx={{ ...pageMargin }}>
        <h1>Forgot Password</h1>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          >
            Send Reset Password Link
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ForgotPassword
