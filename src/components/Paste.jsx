import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice"; // Import action
import { useNavigate } from "react-router-dom"; // Import navigation hook
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleEdit(pasteId) {
    navigate(`/edit/${pasteId}`);
  }

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Deleted Successfully!");
  }

  function handleView(pasteId) {
    navigate(`/view/${pasteId}`);
  }

  function handleShare(paste) {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: `${window.location.origin}/view/${paste._id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Shared Successfully!"))
        .catch((error) => toast.error("Error sharing: " + error.message));
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("Link copied to clipboard!");
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg">
      {/* Search Bar */}
      <input
        className="w-full p-3 mb-6 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
        type="search"
        placeholder="🔍 Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="flex flex-col gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md transition hover:shadow-lg">
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{paste.title}</h2>

              {/* Content Preview */}
              <p className="text-gray-700 dark:text-gray-300 truncate max-w-full">{paste.content}</p>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(paste._id)} className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition">✏️ Edit</button>
                  <button onClick={() => handleView(paste._id)} className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition">👁️ View</button>
                  <button onClick={() => handleDelete(paste._id)} className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600 transition">🗑️ Delete</button>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { navigator.clipboard.writeText(paste?.content); toast.success("Copied to clipboard!"); }} className="px-4 py-2 bg-gray-500 text-black rounded-lg hover:bg-gray-600 transition">📋 Copy</button>
                  <button onClick={() => handleShare(paste)} className="px-4 py-2 bg-purple-500 text-black rounded-lg hover:bg-purple-600 transition">📤 Share</button>
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                🕒 {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
