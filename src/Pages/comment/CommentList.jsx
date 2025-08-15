import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [offsetY, setOffsetY] = useState(0);
  const listRef = useRef(null);

  const scrollSpeed = 1; // px per frame
  const frameRate = 30; // interval in ms

  // Fetch all comments with Axios
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, []);

  // Scrolling effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (listRef.current) {
        const totalHeight = listRef.current.scrollHeight / 2;
        setOffsetY((prev) => (prev >= totalHeight ? 0 : prev + scrollSpeed));
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (comments.length === 0)
    return <p className="text-center mt-10">No comments found!</p>;

  return (
    <div className="mb-20">
      <div className="text-center flex mt-10  flex-col  text-info">
        <p className="text-3xl md:text-3xl lg:text-4xl italic font-bold">Our users say </p>
        <Link className="mt-2 text-xl text-end hover:underline" to="/comment">
        {" "}
        write your comment
      </Link>
      </div>
      

      <div className="relative h-[300px] my-10 w-full overflow-hidden p-4">
        <motion.div
          ref={listRef}
          style={{ y: -offsetY }}
          className="flex flex-col gap-4"
        >
          {[...comments, ...comments].map((comment, index) => (
            <div
              key={`${comment._id}-${index}`}
              className="flex items-start gap-3 bg-gray-100 p-3 rounded-md shadow-sm w-full"
            >
              {/* User Photo */}
              {comment.photoURL && (
                <img
                  src={comment.photoURL}
                  alt={comment.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
              )}

              <div>
                {/* Name and Email */}
                <h2 className="text-sm font-bold">{comment.name}</h2>
                <p className="text-xs text-gray-500">{comment.email}</p>

                {/* Title and Description */}
                <p className="text-sm font-semibold mt-1">{comment.title}</p>
                <p className="text-xs text-gray-700">{comment.description}</p>

                {/* Timestamp */}
                {comment.created_at && (
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {formatDate(comment.created_at)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CommentList;
