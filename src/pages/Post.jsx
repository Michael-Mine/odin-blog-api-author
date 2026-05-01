import { useOutletContext, useParams } from "react-router";
import formatDate from "../utils/formatDate";
import Login from "../components/Login";
import WriteComment from "../components/WriteComment";
import Comments from "../components/Comments";
import styles from "../styles/Post.module.css";
import { useState } from "react";

function Post() {
  const [allPosts] = useOutletContext();
  const [loggedIn, setLoggedIn] = useState(false);
  let { postId } = useParams();
  const post = allPosts.find((post) => post.id == postId);

  if (!post) return <h2>Post Not Found</h2>;

  const date = formatDate(post.datePublished);
  const token = localStorage.getItem("JWT");

  return (
    <div>
      <img
        src={post.picUrl ? post.picUrl : "https://picsum.photos/400/600"}
        alt="blog post picture"
        className={styles.image}
      />
      <div className={styles.post}>
        <h2>{post.title}</h2>
        <p>
          By Mr Mine - Published on {date.toDateString()} at{" "}
          {date.toLocaleTimeString()}
        </p>
        <p>{post.content}</p>
      </div>
      {token || loggedIn ? (
        <WriteComment setLoggedIn={setLoggedIn} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
      <Comments />
    </div>
  );
}

export default Post;
