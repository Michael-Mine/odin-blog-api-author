import { useParams } from "react-router";
import { useState } from "react";
import PropTypes from "prop-types";

function PublishPost({ post }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  let { postId } = useParams();

  const url = `${apiUrl}posts/${postId}`;
  const JWT = localStorage.getItem("JWT");

  const pubOrUnpublishPost = () => {
    console.log("Updating Post " + postId);
    setSending(true);

    let date = "";
    if (!post.isPublished) {
      date = new Date();
    }

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        isPublished: !post.isPublished,
        datePublished: date,
      }),
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
      <button onClick={pubOrUnpublishPost}>
        {post.datePublished ? "Unpublish Post" : "Publish Post"}
      </button>
      {error && <p className="characters">A network error was encountered</p>}
    </>
  );
}

PublishPost.propTypes = {
  post: PropTypes.shape({
    authorId: PropTypes.number,
    content: PropTypes.string,
    datePublished: PropTypes.string,
    id: PropTypes.number,
    isPublished: PropTypes.bool,
    picUrl: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default PublishPost;
