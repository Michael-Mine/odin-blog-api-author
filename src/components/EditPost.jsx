import { useParams } from "react-router";
import { useState } from "react";
import PropTypes from "prop-types";

function EditPost({ post }) {
  const [formData, setFormData] = useState({
    title: post.title,
    picURL: post.picURL,
    content: post.content,
    isPublished: post.isPublished,
    datePublished: post.datePublished,
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  let { postId } = useParams();
  const url = `http://localhost:3000/posts/${postId}`;
  const JWT = localStorage.getItem("JWT");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEdit = () => {
    console.log("Sending Post Edit", formData);
    setSending(true);

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => setSending(false));
  };

  if (sending) return <p className="characters">Sending...</p>;
  if (response && response.message === "post updated")
    return <p className="characters">{response.message}</p>;

  return (
    <div>
      <h2>Edit Post</h2>
      <div className="input-container">
        <label htmlFor="title">Title:</label>
        <input
          className="input-field"
          id="title"
          name="title"
          data-testid="title-input"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="picURL">Picture URL:</label>
        <input
          className="input-field"
          id="picURL"
          name="picURL"
          data-testid="picURL-input"
          type="text"
          value={formData.picURL}
          onChange={handleChange}
        />
      </div>
      <textarea
        className="input-field post"
        data-testid="content-input"
        type="text"
        name="content"
        placeholder="Write post"
        value={formData.content}
        onChange={handleChange}
        maxLength="5000"
      />
      <div>
        <button onClick={sendEdit}>Send Edit</button>
      </div>
      {error && <p className="characters">A network error was encountered</p>}
      {response && (
        <p className="characters">{response.message || response[0].msg}</p>
      )}
    </div>
  );
}

EditPost.propTypes = {
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

export default EditPost;
