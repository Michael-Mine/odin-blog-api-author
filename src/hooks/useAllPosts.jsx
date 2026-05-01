import { useEffect, useState } from "react";

const useAllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching allPosts");
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setAllPosts([...response]))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { allPosts, error, loading };
};

export default useAllPosts;
