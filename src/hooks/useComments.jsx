import { useEffect, useState } from "react";

const useComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = `http://localhost:3000/posts/${postId}/comments`;

  useEffect(() => {
    const controller = new AbortController();

    console.log("fetching comments " + url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setComments([...response]))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Aborted");
        }
        setError(error);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
      console.log("Comments fetch aborted");
      setLoading(true);
    };
  }, [url]);

  return { comments, error, loading };
};

export default useComments;
