import { useOutletContext } from "react-router";
import HomePostItem from "../components/HomePostItem";
import styles from "../styles/Home.module.css";

function Home() {
  const [allPosts, error, loading] = useOutletContext();
  console.log(allPosts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className={styles.container}>
      {allPosts.map((post) => {
        return <HomePostItem key={post.id} post={post} />;
      })}
    </div>
  );
}

export default Home;
