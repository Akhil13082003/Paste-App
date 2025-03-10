import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast"; //  Toast notifications

const Home = () => {
  const { pasteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (pasteId) {
      const existingPaste = pastes.find((paste) => paste._id === pasteId);
      if (existingPaste) {
        setTitle(existingPaste.title);
        setValue(existingPaste.content);
      }
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const Paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(Paste)); //  Update existing paste
      toast.success("Paste Updated Successfully! 🎉"); //  Toast on update
    } else {
      dispatch(addToPastes(Paste)); //  Create new paste
      toast.success("Paste Created Successfully! "); //  Toast on create
    }

    // Reset fields and navigate back
    setTitle("");
    setValue("");
    navigate("/pastes");
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      {/*  Responsive Form Container */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 sm:items-center">
        <input
          className="p-3 rounded-lg flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-black focus:ring-2 focus:ring-blue-500 outline-none w-full"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="p-3 rounded-lg bg-blue-500 text-black hover:bg-blue-600 transition w-full sm:w-auto bg-blue-800"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      {/*  Responsive Text Area */}
      <div className="mt-8">
        <textarea
          className="border rounded-lg w-full min-h-[300px] p-4 bg-gray-100 dark:bg-gray-700 dark:text-black"
          value={value}
          placeholder="Enter text here"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
