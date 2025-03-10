import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { pasteId } = useParams(); //  Get pasteId from URL
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === pasteId); //  Find the paste by ID

  if (!paste) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">🚨 Paste Not Found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{paste.title}</h1>

      {/* Content */}
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-gray-800 dark:text-gray-300">{paste.content}</p>
      </div>

      {/* Timestamp */}
      <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
        🕒 Created: {new Date(paste.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ViewPaste;
