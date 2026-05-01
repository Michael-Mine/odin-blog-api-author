import { useParams } from "react-router";
import { useState } from "react";
import PropTypes from "prop-types";

function WriteComment({ setLoggedIn }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  let { postId } = useParams();
  const url = `http://localhost:3000/posts/${postId}/comments`;
  const JWT = localStorage.getItem("JWT");

  const submitComment = (input) => {
    console.log("submitting", input);
    setSending(true);

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({ content: input }),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => setSending(false));
  };

  if (sending) return <p>Sending...</p>;
  if (response && response.message === "comment created")
    return <p>{response.message}</p>;

  const logout = () => {
    localStorage.removeItem("JWT");
    setLoggedIn(false);
  };

  const characters = input.length;

  return (
    <div>
      <h3>Add a Comment</h3>
      <div className="comment-container">
        <button onClick={() => logout()}>Logout</button>
        <textarea
          className="input-field comment"
          data-testid="comment-input"
          type="text"
          placeholder="Add a comment"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength="400"
        />
        <button onClick={() => submitComment(input)}>Submit</button>
      </div>
      <p className="characters">Max characters {characters}/400</p>
      {error && <p className="characters">A network error was encountered</p>}
      {response && (
        <p className="characters">{response.message || response[0].msg}</p>
      )}
    </div>
  );
}

WriteComment.propTypes = {
  setLoggedIn: PropTypes.func,
};

export default WriteComment;
