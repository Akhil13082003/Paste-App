import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ✅ Fix: Safely parse `localStorage`
const storedPastes = localStorage.getItem("pastes");
let parsedPastes;

try {
  parsedPastes = storedPastes ? JSON.parse(storedPastes) : [];
} catch (error) {
  console.error("Error parsing pastes from localStorage:", error);
  parsedPastes = []; // Default to an empty array if JSON parsing fails
}

// ✅ Fix: Always store JSON properly in `localStorage`
export const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: parsedPastes,
  },
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // ✅ Fixed
      toast("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste.id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // ✅ Fixed
        toast.success("Paste Updated");
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log("Deleting paste ID:", pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // ✅ Fixed
      }
    },
    resetToPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes deleted");
    },
  },
});

// Action creators
export const { addToPastes, updateToPastes, removeFromPastes, resetToPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
