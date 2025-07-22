import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { IoCloseCircle } from "react-icons/io5";

const AddPost = ({ handleGetAllPost, setShowAddPage }) => {
  const [addPost, setAddPost] = useState("");
  const { user } = useContext(AppContext);

  const handleAddPost = async () => {
    const url = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(`${url}/api/posts`, {
        post: addPost,
        userId: user._id,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setAddPost("");
        handleGetAllPost();
        setShowAddPage(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8">
      <div className="relative w-full max-w-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setShowAddPage(false)}
          className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"
        >
          <IoCloseCircle size={26} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">
          📝 Create a New Post
        </h2>

        <label className="block mb-2 font-medium text-slate-300 text-lg">
          What's on your mind?
        </label>
        <textarea
          rows={6}
          value={addPost}
          onChange={(e) => setAddPost(e.target.value)}
          className="w-full p-4 bg-black/40 border border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none resize-none text-white placeholder:text-slate-400 text-base transition-all duration-200"
          placeholder="Share your thoughts..."
          autoFocus
        />

        <button
          onClick={handleAddPost}
          className="mt-5 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default AddPost;
