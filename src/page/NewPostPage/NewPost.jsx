import { useState } from "react";
import Navbar from "../../components/Navbar";
import MainContainer from "../../components/MainContainer";
import { supabase } from "../../client";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

function NewPost() {
  const userId = useUser();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    published: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("posts").insert({
      user_id: userId,
      ...post,
    });
    if (error) {
      console.log("Error creating post:", error.message);
    } else {
      console.log("Post created:", data && data[0]);
      setPost({
        title: "",
        content: "",
        published: false,
      });
      // jump back to the community page
      navigate('/community');
    }

  };

  return (
    <div className="newpost-container">
    <Navbar />
    <MainContainer>
        <h1>New Post</h1>
        <form className="form" onSubmit={handleSubmit}>
        <div>
            <input type="text" id="title" name="title" value={post.title} onChange={handleChange} placeholder="Title" />
        </div>
        <div>
            <textarea id="content" name="content" value={post.content} onChange={handleChange} placeholder="Enter post content here..."></textarea>
        </div>
        <div>
            <label htmlFor="published">Make Public</label>
            <input type="checkbox" id="published" name="published" checked={post.published} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        </form>
    </MainContainer>
    </div>


  );
}

export default NewPost;
