import { FiMessageCircle, FiThumbsUp, FiEdit2, FiFileText, FiSend } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const Comment = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const commentUserData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        title: data.title,
        description: data.description,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment`,
        commentUserData
      );
      if (res.data.acknowledged) {
        toast.success("Your comment was added successfully");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  return (
    <div className="max-w-md  lg:mx-auto mt-6 p-6 mx-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FiEdit2 /> Write a Comment
      </h2>

      <Marquee
        gradient={false}
        speed={40}
        className="mb-4 text-lg font-semibold text-info"
      >
        <p className="flex items-center gap-2">
          <FiMessageCircle /> 
          Hey {user.displayName}! Share your thoughts and experiences with us. 
          <FiThumbsUp /> Your feedback helps us improve and create a better website for everyone!
        </p>
      </Marquee>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div className="flex items-center gap-2">
          <FiFileText className="text-sky-500 text-xl" />
          <input
            type="text"
            placeholder="Enter title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}

        {/* Description Field */}
        <div className="flex items-center gap-2">
          <FiEdit2 className="text-sky-500 text-xl" />
          <textarea
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[100px]"
          ></textarea>
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-info text-white px-4 py-2 rounded-md hover:bg-sky-500 transition-colors"
        >
          <FiSend /> Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
