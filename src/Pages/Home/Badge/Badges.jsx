import { useLoaderData } from "react-router";
import BadgeCard from "./BadgeCard";

const Badges = () => {
  const badges = useLoaderData();

  return (
   <div>
    <h2 className="text-center text-3xl my-6 text-info">Membership option</h2>
     <div className="grid lg:mb-10 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      {badges.map((badge) => (
        <BadgeCard key={badge._id} badge={badge} />
      ))}
    </div>
   </div>
  );
};

export default Badges;
