import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import GuestPage from "./GuestPage";
import ProfilePage from "./ProfilePage";
import AllPosts from "./AllPosts";

const Home = () => {
  const { user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("all");

  if (!user) return <GuestPage />;

  const tabOptions = [
    { key: "all", label: "All Posts", component: <AllPosts /> },
    { key: "my", label: "My Posts", component: <ProfilePage /> },
  ];

  const renderAnimatedName = (name) =>
    name.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block animate-letter text-3xl md:text-4xl font-bold mx-0.5`}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {char}
      </span>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-slate-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-400 tracking-tight drop-shadow-lg">
            Welcome,
          </h1>
          <h2 className="mt-3 flex justify-center flex-wrap">{renderAnimatedName(user.name)}</h2>
          <div className="w-24 h-1 mt-3 mx-auto bg-emerald-400 rounded-full animate-pulse" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-4">
          {tabOptions.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.key
                  ? "bg-emerald-500 text-black shadow-xl"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="mt-6">
          {tabOptions.find((tab) => tab.key === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Home;
