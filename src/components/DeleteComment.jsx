import { useParams } from "react-router";
import { useState } from "react";
import PropTypes from "prop-types";

function DeleteComment({ commentId }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  let { postId } = useParams();
  const url = `http://localhost:3000/posts/${postId}/comments/${commentId}`;
  const JWT = localStorage.getItem("JWT");

  const deleteComment = () => {
    console.log("Deleting Comment " + commentId);
    setSending(true);

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => setSending(false));
  };

  if (sending) return <p className="characters">Sending...</p>;
  if (response)
    return <p className="characters">{response.message || response[0].msg}</p>;

  return (
    <>
      <button onClick={deleteComment}>Delete</button>
      {error && <p className="characters">A network error was encountered</p>}
    </>
  );
}

DeleteComment.propTypes = {
  commentId: PropTypes.number,
};

export default DeleteComment;
