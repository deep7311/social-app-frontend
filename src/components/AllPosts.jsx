import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import ShowAllPostComments from "./ShowAllPostComments";
import moment from "moment";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({});
  const [showCommentFullScreen, setShowCommentFullScreen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user } = useContext(AppContext);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const getAllPosts = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${url}/api/posts/exclude/${user._id}?page=${page}&limit=${limit}&search=${search}`);
      const allPosts = response.data.posts;

      const postsWithComments = await Promise.all(
        allPosts.map(async (post) => {
          const res = await axios.get(`${url}/api/comments/post/${post._id}`);
          return { ...post, comments: res.data.comments };
        })
      );
      setPosts(postsWithComments);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (postId) => {
    const commentText = comment[postId]?.trim();
    if (!commentText) return toast.error("Please enter a comment");

    const url = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${url}/api/comments`, {
        comment: commentText,
        postId,
        userId: user._id,
      });

      if (response.data.success) {
        toast.success("Comment added");
        setComment((prev) => ({ ...prev, [postId]: "" }));

        const commentsRes = await axios.get(
          `${url}/api/comments/post/${postId}`
        );
        const updatedPost = posts.find((p) => p._id === postId);

        if (updatedPost) {
          const updated = {
            ...updatedPost,
            comments: commentsRes.data.comments,
          };
          setSelectedPost(updated);
        }

        await getAllPosts();
      }
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await axios.delete(`${url}/api/comments/${commentId}`);
      if (response.data.success) {
        toast.success(response.data.message);
      }

      const commentsRes = await axios.get(`${url}/api/comments/post/${postId}`);
      const updatedPost = posts.find((p) => p._id === postId);

      if (updatedPost) {
        const updated = {
          ...updatedPost,
          comments: commentsRes.data.comments,
        };
        setSelectedPost(updated);
      }

      await getAllPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [page, limit, search]);

  return (
    <div className="p-4 md:p-6 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">🌐 All Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md p-5 flex flex-col justify-between max-h-fit"
          >
            {/* Header */}
            <div className="mb-3">
              <p className="text-sm text-gray-400 mb-1">
                Posted by:{" "}
                <span className="text-white font-medium">
                  {post.userId?.name}
                </span>{" "}
                • {moment(post.createdAt).fromNow()}
              </p>
            </div>

            {/* Post Content */}
            <div className="mb-5 overflow-y-auto max-h-fit text-lg text-blue-400 font-semibold whitespace-pre-wrap">
              {post.post}
            </div>

            {/* Comment Input */}
            <div className="mt-auto">
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                  value={comment[post._id] || ""}
                  onChange={(e) =>
                    setComment((prev) => ({
                      ...prev,
                      [post._id]: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={() => handleAddComment(post._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Comment
                </button>
              </div>

              {/* Comments Preview */}
              <div className="mt-4 overflow-y-auto max-h-32">
                {post.comments?.length === 0 ? (
                  <p className="italic text-gray-500 mt-2">No comments yet.</p>
                ) : (
                  <>
                    {post.comments.slice(0, 2).map((c) => (
                      <div
                        key={c._id}
                        className="flex justify-between items-center text-sm text-gray-300 mb-1"
                      >
                        <span>
                          <span className="font-semibold text-white">
                            {c.userId?.name}
                          </span>
                          : {c.comment}
                        </span>

                        {/* Show delete button only if comment belongs to current user */}
                        {c.userId?._id === user._id && (
                          <button
                            onClick={() => handleDeleteComment(c._id, post._id)}
                            className="text-red-500 hover:text-red-700 ml-2 text-xs"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}

                    {post.comments.length > 2 && (
                      <div className="text-sm text-blue-400 hover:underline cursor-pointer mt-1">
                        <button
                          onClick={() => {
                            setShowCommentFullScreen(true);
                            setSelectedPost(post);
                          }}
                        >
                          View all {post.comments.length} comments
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCommentFullScreen && selectedPost && (
        <ShowAllPostComments
          selectedPost={selectedPost}
          setShowCommentFullScreen={setShowCommentFullScreen}
          handleAddComment={handleAddComment}
          comment={comment}
          setComment={setComment}
          handleDeleteComment={handleDeleteComment}
        />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 ${page === 1
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
            className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 ${page === totalPages
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};

export default AllPosts;
