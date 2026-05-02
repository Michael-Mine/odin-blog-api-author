import { useState } from "react";

function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    picURL: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    </div>
  );
}

export default NewPost;
