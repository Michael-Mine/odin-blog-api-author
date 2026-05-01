import { useParams } from "react-router";
import useComments from "../hooks/useComments";
import CommentItem from "./CommentItem";

function Comments() {
  let { postId } = useParams();
  const { comments, error, loading } = useComments({ postId });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div>
      <h3>{comments.length} Comments</h3>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
}

export default Comments;
