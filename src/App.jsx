import { Outlet } from "react-router";
import useAllPosts from "./hooks/useAllPosts";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./styles/button.css";
import "./styles/input.css";

function App() {
  const { allPosts, error, loading } = useAllPosts();

  return (
    <>
      <Navbar />
      <h1>Mr Mine Blog API - Author Access</h1>
      <Outlet context={[allPosts, error, loading]} />
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

// login to begin

// update Readme's
