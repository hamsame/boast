import React, { useState, useEffect, useRef } from "react"
import { useAuthStatus } from "../hooks/useAuthStatus"
import { collection, getDocs, setDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import { getAuth } from "firebase/auth"

// material ui
import { blue, grey } from "@mui/material/colors"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import Button from "@mui/material/Button"

const Home = () => {
  const { loggedIn } = useAuthStatus()
  const isMounted = useRef(true)
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({
    caption: "",
    userRef: "",
    displayName: "",
    date: new Date().getTime().toString(),
  })
  const getPosts = async () => {
    let newPosts = []
    try {
      const allPosts = await getDocs(collection(db, "posts"))
      allPosts.forEach((doc) => {
        newPosts = [...newPosts, doc.data()]
      })
      console.log(newPosts)
      setPosts(newPosts)
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (e) => {
    e.preventDefault()
    setNewPost({ ...newPost, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const user = auth.currentUser
      const [displayName, userRef] = [user.displayName, user.uid]
      setNewPost({ ...newPost, displayName, userRef })
      // push doc

      if (newPost.caption && newPost.displayName && newPost.userRef) {
        const newPostFromUser = doc(collection(db, "posts"))
        await setDoc(newPostFromUser, newPost)
        console.log("posted")
        setNewPost({
          caption: "",
          userRef: "",
          displayName: "",
          date: new Date().getTime().toString(),
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isMounted) {
      getPosts()
    }
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return (
    <Container sx={{ width: 0.9, my: 2, mx: 0.1 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "10%" }}>
        <h1>Boast</h1>
      </Box>
      {loggedIn && (
        <header>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "10%" }}
          >
            <FormControl variant="standard">
              <InputLabel htmlFor="caption">Share something cool</InputLabel>
              <Input
                id="caption"
                type="name"
                value={newPost.caption}
                onChange={onChange}
              />
            </FormControl>
            <Button
              sx={{
                width: "30%",
                backgroundColor: blue[500],
                color: grey[100],
                "&:hover": {
                  backgroundColor: blue[700],
                  color: grey[100],
                },
              }}
              type="submit"
            >
              Share
            </Button>
          </Box>
        </header>
      )}

      <Box>
        {posts.map((post, index) => {
          const { caption, userRef, date, displayName, imageUrls } = post
          return (
            <article key={index}>
              <h3>{caption}</h3>
              <p>{displayName || "No name"}</p>
              {imageUrls
                ? imageUrls.map((image, index) => {
                    return (
                      <img
                        width={"300px"}
                        height={"150px"}
                        key={index}
                        src={image}
                        alt=""
                      />
                    )
                  })
                : null}
              <p>works</p>
            </article>
          )
        })}
      </Box>
    </Container>
  )
}

export default Home
