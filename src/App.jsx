import { Outlet } from "react-router";
import { useState } from "react";
import useAllPosts from "./hooks/useAllPosts";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Login from "./components/Login";
import "./styles/button.css";
import "./styles/input.css";

function App() {
  const { allPosts, error, loading } = useAllPosts();
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("JWT");

  const logout = () => {
    localStorage.removeItem("JWT");
    setLoggedIn(false);
  };

  return (
    <>
      <Navbar />
      <h1>Mr Mine Blog API - Author Access</h1>
      <div>
        {(token || loggedIn) && (
          <button onClick={() => logout()}>Logout</button>
        )}
      </div>
      {token || loggedIn ? (
        <Outlet context={[allPosts, error, loading]} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
      <Footer />
    </>
  );
}

export default App;

// add whether published or not home listing

// published button on post page
// delete comments on post page

// new page for new posts

// add way to edit existing posts

// update Readme's
