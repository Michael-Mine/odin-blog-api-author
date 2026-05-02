import { useParams } from "react-router";
import { useState } from "react";
import PropTypes from "prop-types";

function PublishPost({ post }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  let { postId } = useParams();
  const url = `http://localhost:3000/posts/${postId}`;
  const JWT = localStorage.getItem("JWT");

  const unpublishPost = () => {
    console.log("Updating Post " + postId);
    setSending(true);

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        isPublished: false,
      }),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => setSending(false));
  };

  const publishPost = () => {
    console.log("Updating Post " + postId);
    setSending(true);

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        isPublished: true,
        datePublished: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => setSending(false));
  };

  if (sending) return <p>Sending...</p>;

  return (
    <>
      {post.datePublished ? (
        <button onClick={unpublishPost}>Unpublish Post</button>
      ) : (
        <button onClick={publishPost}>Publish Post</button>
      )}
      {error && <p className="characters">A network error was encountered</p>}
      {response && (
        <p className="characters">{response.message || response[0].msg}</p>
      )}
    </>
  );
}

PublishPost.propTypes = {
  post: PropTypes.shape({
    authorId: PropTypes.number,
    content: PropTypes.string,
    datePublished: PropTypes.string,
    id: PropTypes.number,
    picUrl: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default PublishPost;
