import App from "../App.jsx";
import ErrorPage from "../pages/Error-404.jsx";
import Home from "../pages/Home.jsx";
import Post from "../pages/Post.jsx";
import NewPost from "../pages/NewPost.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "post/:postId", element: <Post /> },
      { path: "new-post", element: <NewPost /> },
    ],
  },
];

export default routes;
