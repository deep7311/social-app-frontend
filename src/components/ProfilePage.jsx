import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import AddPost from "./AddPost";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import ShowUserPostComment from "./ShowUserPostComment";

const ProfilePage = () => {
  const [showAllPost, setShowAllPost] = useState([]);
  const { user } = useContext(AppContext);
  const [showAddPage, setShowAddPage] = useState(false);

  const [showCommentFullScreen, setShowCommentFullScreen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [comments, setComments] = useState([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  const handleGetAllPost = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(
        `${url}/api/posts/${user._id}?page=${page}&limit=${limit}&search=${search}`
      );
      if (response.data.success) {
        setShowAllPost(response.data.posts);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  
  const handleDeletePost = async (postId) => {
    const url = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.delete(`${url}/api/posts/${postId}`);
      if (response.data.success) {
        toast.success(response.data.message || "Post deleted successfully");
        handleGetAllPost();
      } else {
        toast.error("Failed to delete the post");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting the post");
    }
  };

  useEffect(() => {
    handleGetAllPost();
  }, [page]);

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      {/* Add Post Button */}
      <div className="max-w-3xl mx-auto mb-6 text-right">
        <button
          onClick={() => setShowAddPage(!showAddPage)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold shadow-lg transition-all duration-200"
        >
          <FaPlus /> Add Post
        </button>
      </div>

      {/* Posts List */}
      {/* Posts List */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <h2 className="text-xl font-bold mb-4 text-white">📝 My Posts</h2>

        {showAllPost.length === 0 ? (
          <p className="text-center text-slate-400">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showAllPost.map((post) => (
              <div
                key={post._id}
                className="bg-black/30 border border-slate-700 p-4 rounded-xl relative hover:shadow-md transition-all duration-200 group"
              >
                <p className="whitespace-pre-wrap text-slate-100 mb-2 leading-relaxed text-base">
                  {post.post}
                </p>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="absolute top-3 right-4 text-red-400 hover:text-red-500 text-lg font-semibold opacity-80 hover:opacity-100 transition-opacity duration-200"
                  title="Delete Post"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setShowCommentFullScreen(true);
                  }}
                  className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
                >
                  Show Comments
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                page === 1
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
            >
              Prev
            </button>

            <span className="px-4 py-2 bg-white text-indigo-600 font-semibold border border-indigo-400 rounded-lg shadow-sm">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                page === totalPages
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add Post Modal */}
      {showAddPage && (
        <AddPost
          handleGetAllPost={handleGetAllPost}
          setShowAddPage={setShowAddPage}
        />
      )}

      {showCommentFullScreen && selectedPost && (
        <ShowUserPostComment
          selectedPost={selectedPost}
          setShowCommentFullScreen={setShowCommentFullScreen}
        />
      )}
    </div>
  );
};

export default ProfilePage;
