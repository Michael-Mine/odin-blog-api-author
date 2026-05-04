import { useEffect, useState } from "react";

const useAllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const JWT = localStorage.getItem("JWT");

  useEffect(() => {
    console.log("fetching allPosts");
    fetch(`${apiUrl}posts/all`, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setAllPosts([...response]))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [apiUrl, JWT]);

  return { allPosts, error, loading };
};

export default useAllPosts;
