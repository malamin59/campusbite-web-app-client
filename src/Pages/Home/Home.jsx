import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Shard/LoadingSpinner/LoadingSpinner";
import CommentList from "../comment/CommentList";
import Badges from "./Badge/Badges"; 
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWork/HowItWorks";
import MealTabs from "./MealsbyCategory/MealTabs";
import SpecialFeatures from "./SpecialFeatures/SpecialFeatures";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const Home = () => {

  const { loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" mx-1">
      <Banner />
      {/* <Badges/> */}
      <MealTabs/>
      <HowItWorks/>
      <WhyChooseUs/>
      <SpecialFeatures/>
      <CommentList/>
    </div>
  );
};

export default Home;
