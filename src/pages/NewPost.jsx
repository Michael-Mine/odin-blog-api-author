import { useState } from "react";

function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    picURL: "",
    content: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}posts`;
  const JWT = localStorage.getItem("JWT");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addPost = () => {
    console.log("Adding New Post", formData);
    setSending(true);

    fetch(url, {
      method: "POST",
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
  if (response && response.message === "post created")
    return <p className="characters">{response.message}</p>;

  return (
    <div>
      <h2>New Post</h2>
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
        <button onClick={addPost}>Add Post</button>
      </div>
      {error && <p className="characters">A network error was encountered</p>}
      {response && (
        <p className="characters">{response.message || response[0].msg}</p>
      )}
    </div>
  );
}

export default NewPost;
