import { useParams } from "react-router";
import useAllPosts from "../hooks/useAllPosts";
import formatDate from "../utils/formatDate";
import Comments from "../components/Comments";
import styles from "../styles/Post.module.css";

function Post() {
  const { allPosts, error, loading } = useAllPosts();

  let { postId } = useParams();
  const post = allPosts.find((post) => post.id == postId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  if (!post) return <h2>Post Not Found</h2>;

  const date = formatDate(post.datePublished);

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
          {post.datePublished
            ? "Published on " +
              date.toDateString() +
              " at " +
              date.toLocaleTimeString()
            : "Not Published"}
        </p>
        <p>{post.content}</p>
      </div>
      <Comments />
    </div>
  );
}

export default Post;
