import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import toast from 'react-hot-toast'
import axios from 'axios'

export default function CreateNote() {
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");

  const navigate=useNavigate("/")


  const handleSubmit=async(e)=>{
    e.preventDefault();
  
    if (!title.trim() || !content.trim()){
      toast.error("All Fields are Empty");
      return;
    }

    try {
      await axios.post("http://localhost:5000/create",{
        title,content});
        toast.success("Note Created Successfuly");
        navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("failed to create note")
      
    }



  }




  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="p-8 rounded-2xl shadow-xl w-[600px] bg-black">
        {/* Back button */}
        <Link to="/" className="flex items-center text-sm text-white font-bold hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Notes
        </Link>

        <h2 className="text-2xl font-bold mb-6">Create New Note</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="Note Title"
              className="w-full p-2 rounded-lg bg-black border border-zinc-700 focus:outline-none text-white placeholder-white"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Content</label>
            <textarea
              placeholder="Write your note here..."
              className="w-full p-2 rounded-lg bg-black border border-zinc-700 h-32 focus:outline-none text-white placeholder-white"
            value={content}
            onChange={(e)=>setContent(e.target.value)}></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg "
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}