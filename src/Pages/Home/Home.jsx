import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Shard/LoadingSpinner/LoadingSpinner";
import Badges from "./Badge/Badges"; 
import Banner from "./Banner/Banner";

const Home = () => {

  const { loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="overflow-x-hidden mx-1">
      <Banner />
      <Badges/>
    </div>
  );
};

export default Home;
