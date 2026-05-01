import formatDate from "../utils/formatDate";
import PropTypes from "prop-types";

function CommentItem({ comment }) {
  const date = formatDate(comment.date);

  return (
    <div>
      <p>
        By {comment.author.firstName} {comment.author.lastName.charAt(0)} on{" "}
        {date.toDateString()} at {date.toLocaleTimeString()}{" "}
      </p>
      <p>{comment.content}</p>
      <hr />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.number,
    authorId: PropTypes.number,
    postId: PropTypes.number,
  }),
};

export default CommentItem;
