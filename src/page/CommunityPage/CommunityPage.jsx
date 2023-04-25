import { useUser } from "../../hooks/useUser"
import { supabase } from "../../client"
import { useState, useEffect } from "react"
import "./CommunityPage.css"
import MainContainer from "../../components/MainContainer"
import Navbar from "../../components/Navbar"
import { Link } from "react-router-dom"



function CommunityPage() {
  const userId = useUser()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("title, content")
        .eq("published", true)
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
  <div className="community-container">
    <Navbar />
    <MainContainer>
      <h2 className="page-title">Community</h2>
      <Link to="/newpost" className="link">New Post</Link>
      <Link to="/mypost" className="link">My Post</Link>
      {posts?.map((post, index) => (
        <div className="post-container" key={index}>
          <h2 className="post-title">{post.title}</h2>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ))}
    </MainContainer>
  </div>

  );
}

export default CommunityPage;
