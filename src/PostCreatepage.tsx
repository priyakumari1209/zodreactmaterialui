import React from 'react'
import { useNavigate } from "react-router-dom";
import { UsersProvider } from "./users/components/BlogsProvider";


const PostCreatepage = () => {
    const navigate = useNavigate();
  return (
    <div>
       <h1>Blogs</h1>
            <p>This page displays the Blog date.</p>
            <button onClick={() => navigate("/post-create")}>Go to Blogs Page</button>
            
            
            <UsersProvider type="create" />
    </div>
  )
}

export default PostCreatepage
