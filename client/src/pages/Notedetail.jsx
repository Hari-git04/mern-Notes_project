import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, Trash2Icon } from "lucide-react";
import { useState,useEffect } from "react";
export default function Notedetail() {

  const [note,setNote]=useState({ title: "", content: "" })

  const navigate=useNavigate();

  const {id}=useParams();

  useEffect(()=>{
    const fetchNote=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/note/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log(error);
        toast.error("failed to update note")
      }
    };
    fetchNote();
  },[id]);
  

  const handleDelete=async () => {
    if (!window.confirm("Are you want to delete your Note?"))  return
    try {
      await axios.delete(`http://localhost:5000/note/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } 
    catch (error)
     {
      console.log(error);
      toast.error("Failed To Note delete");
      
      
    }
  };


const handleSave=async()=>{
  if (!note.title.trim() || !note.content.trim()){
    toast.error("Required All Fields")
    return;
  }
  try {
    await axios.put(`http://localhost:5000/note/${id}`,note);
    toast.success("Note Updated successfully")
    navigate("/");
    
  } catch (error) {
    console.log(error);
    toast.error("Failed to update Note")
  }
}

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="p-8 rounded-2xl shadow-xl w-[600px] bg-black">
        {/* Top bar with Back and Delete */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center text-sm text-white hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Notes
          </Link>
          <button className="flex items-center text-red-500 hover:text-red-600 font-semibold" onClick={handleDelete}>
            <Trash2Icon className="w-5 h-5 mr-1" />
            Delete Note
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6">Your Note</h2>

        
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="Note Title"
              className="w-full p-2 rounded-lg bg-black border border-zinc-700 focus:outline-none text-white placeholder-white"
              value={note.title}
              onChange={(e)=> setNote({...note, title:e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Content</label>
            <textarea
              placeholder="Write your note here..."
              className="w-full p-2 rounded-lg bg-black border border-zinc-700 h-32 focus:outline-none text-white placeholder-white"
              value={note.content}
              onChange={(e)=> setNote({...note, content:e.target.value})}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg " onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
       
      </div>
    </div>
  );
}