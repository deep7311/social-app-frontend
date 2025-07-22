import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowUserPostComment = ({ selectedPost, setShowCommentFullScreen }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(
        `${url}/api/comments/${selectedPost._id}`
      );
      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [selectedPost]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-2 py-6">
      <div className="bg-[#1e1e1e] w-full max-w-6xl max-h-screen rounded-lg shadow-2xl overflow-y-auto flex flex-col md:flex-row text-white">
        {/* Post Info */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-700">
          <div className="p-4 border-b bg-[#2c2c2c] border-gray-700">
            <h2 className="text-lg font-semibold">
              Posted by: {selectedPost.userId?.name || "Unknown"}
            </h2>
            <p className="text-xs text-gray-400">
              {new Date(selectedPost.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="p-4 space-y-4">
            <p className="text-gray-100 text-base whitespace-pre-wrap">
              {selectedPost.post}
            </p>
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt="Post"
                className="rounded-lg max-h-64 w-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Comments */}
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center px-4 py-3 border-b bg-[#2c2c2c] border-gray-700">
            <h2 className="text-lg font-semibold">Comments</h2>
            <button
              onClick={() => setShowCommentFullScreen(false)}
              className="text-gray-400 hover:text-red-400"
            >
              ✖ Close
            </button>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto max-h-[400px]">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-3 items-start p-3 bg-[#2c2c2c] border border-gray-700 rounded-lg hover:shadow-sm transition"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                    {comment.userId?.name?.[0]?.toUpperCase() || "A"}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-200">
                        {comment.comment}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      — {comment.userId?.name || "Anonymous"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUserPostComment;
