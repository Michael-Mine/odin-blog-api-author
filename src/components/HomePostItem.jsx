import { Link } from "react-router";
import formatDate from "../utils/formatDate";
import styles from "../styles/HomePostItem.module.css";
import PropTypes from "prop-types";

function HomePostItem({ post }) {
  const url = `/post/${post.id}`;
  const date = formatDate(post.datePublished);
  const content = post.content;

  return (
    <Link to={url} className={styles.item}>
      <img
        src={post.picUrl || "https://picsum.photos/200/300"}
        alt="blog post picture"
        className={styles.image}
      />
      <div className="text">
        <h3>{date.toDateString()}</h3>
        <h2>{post.title}</h2>
        <p>{content.slice(0, 300)}...</p>
      </div>
    </Link>
  );
}

HomePostItem.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.string,
    datePublished: PropTypes.string,
    id: PropTypes.number,
    picUrl: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default HomePostItem;
