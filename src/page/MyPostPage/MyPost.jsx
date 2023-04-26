
import { useUser } from "../../hooks/useUser"
import { supabase } from "../../client"
import { useState, useEffect } from "react"
import MainContainer from "../../components/MainContainer"
import Navbar from "../../components/Navbar"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./MyPost.css"


function MyPost() {
    const userId = useUser()
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        if (!userId) {
            return;
        }
        const { data } = await supabase
          .from("posts")
          .select("id, title, content")
          .eq("user_id", userId)
        setPosts(data? data : [])
      }
  
    useEffect(() => {

      fetchPosts()
    }, [userId])

    const handleDelete = async (e, postId) => {
        // console.log(postId)
        const { data, error } = await supabase
          .from("posts")
          .delete()
          .eq("user_id", userId)
          .eq("id", postId);
        
        // Check for errors and update the list of posts if the delete was successful
        if (error) {
          console.error(error);
        } else {
          await fetchPosts();
        }
      };
      

  return (
    <div className="community-container">
    <Navbar />
    <MainContainer>
        <h2 className="page-title">My Posts</h2>
        <div className="newcommunity-container">
            {posts?.map((post, index) => (
            <div key = {index}>
            <div  className="post-container">
                <h2 className="post-title">{post.title}</h2>
                <div  className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
             <FontAwesomeIcon 
                className="post-delete"
                id={post.id}
                onClick={(e) => handleDelete(e, post.id)} 
                icon={faTrash} 
            />
            </div>
            ))}
            <div>
            </div>
        </div>
    </MainContainer>
    </div>

  );
}

export default MyPost;