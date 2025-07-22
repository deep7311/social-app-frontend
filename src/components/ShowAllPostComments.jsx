import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ShowAllPostComments = ({
  selectedPost,
  setShowCommentFullScreen,
  handleAddComment,
  comment,
  setComment,
  handleDeleteComment
}) => {
  const { user } = useContext(AppContext);

  if (!selectedPost) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-2 py-6">
      <div className="bg-[#1e1e1e] w-full max-w-6xl max-h-screen rounded-lg shadow-2xl overflow-y-auto flex flex-col md:flex-row text-white">
        {/* Post Section */}
        <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-gray-700">
          <div className="p-4 border-b bg-[#2c2c2c] border-gray-700">
            <h2 className="text-base md:text-lg font-semibold text-white">
              Posted by: {selectedPost.userId?.name || "Unknown User"}
            </h2>
            <p className="text-xs text-gray-400">
              {new Date(selectedPost.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1e1e1e]">
            <p className="text-gray-100 text-base whitespace-pre-wrap">
              {selectedPost.post}
            </p>

            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt="Post"
                className="rounded-lg max-h-64 w-full object-cover shadow"
              />
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-[#2c2c2c] border-gray-700">
            <h2 className="text-base md:text-lg font-semibold text-white">Comments</h2>
            <button
              onClick={() => setShowCommentFullScreen(false)}
              className="text-gray-400 hover:text-red-400 text-sm md:text-base"
            >
              ✖ Close
            </button>
          </div>

          {/* Comment List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1e1e1e] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {selectedPost.comments && selectedPost.comments.length > 0 ? (
              selectedPost.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-3 items-start p-3 bg-[#2c2c2c] border border-gray-700 rounded-lg hover:shadow-sm transition"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                    {comment.userId?.name?.[0]?.toUpperCase() || "A"}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-200">{comment.comment}</div>

                      {/* Show delete button only if user is owner */}
                      {user && comment.userId?._id === user._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id, selectedPost._id)}
                          className="text-xs text-red-400 ml-4 hover:underline"
                        >
                          Delete
                        </button>
                      )}
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

          {/* Comment Input */}
          <div className="p-4 border-t bg-[#2c2c2c] border-gray-700">
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment[selectedPost._id] || ""}
                onChange={(e) =>
                  setComment((prev) => ({
                    ...prev,
                    [selectedPost._id]: e.target.value,
                  }))
                }
                className="flex-1 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1e1e1e] text-white border-gray-600 placeholder-gray-400"
              />
              <button
                onClick={() => handleAddComment(selectedPost._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAllPostComments;
