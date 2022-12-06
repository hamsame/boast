import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { red, grey, blue } from "@mui/material/colors"
import { db } from "../firebase.config"

// firestore
import { collection, getDocs } from "firebase/firestore"

const Home = () => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"))
    let userPosts = []
    snapshot.docs.forEach((doc) => {
      userPosts.push({ ...doc.data(), id: doc.id })
    })
    setPosts(userPosts)
  }

  const pageMargin = {
    width: 0.8,
    mx: "auto",
    my: "2vh",
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <Box sx={{ ...pageMargin }}>
      <Box sx={{ width: 1, display: "flex", justifyContent: "space-between" }}>
        <h1>Home</h1>
      </Box>
      <hr />

      {/* posts */}
      <ul>
        {posts
          ? posts.map((post, index) => {
              const { caption, userRef, imageUrls, timestamp } = post
              return (
                <li key={index}>
                  <article>
                    <span>
                      <h3>{caption}</h3>
                    </span>
                    <div
                      style={{
                        width: "25%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {imageUrls.map((item, index) => {
                        return (
                          <img
                            style={{
                              width: "100%",
                              // height: "100%"
                            }}
                            key={index}
                            src={item}
                            alt=""
                          />
                        )
                      })}
                    </div>
                  </article>
                </li>
              )
            })
          : ""}
      </ul>
    </Box>
  )
}

export default Home
