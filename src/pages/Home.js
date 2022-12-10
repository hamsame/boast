import React, { useState, useRef } from "react"
import { useAuthStatus } from "../hooks/useAuthStatus"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"
import { useEffect } from "react"

// material ui
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

const Home = () => {
  const isMounted = useRef(true)
  const [posts, setPosts] = useState([])
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

  useEffect(() => {
    if (isMounted) {
      getPosts()
    }
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return (
    <Container>
      <header>
        <h1>Home</h1>
      </header>
      <Box>
        {posts.map((post, index) => {
          const { caption, userRef, displayName, imageUrls } = post
          return (
            <article key={index}>
              <h3>{caption}</h3>
              <p>{displayName || "No name"}</p>
              {imageUrls
                ? imageUrls.map((image, index) => {
                    return <img key={index} src={image} alt="" />
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
