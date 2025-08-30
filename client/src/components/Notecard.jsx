import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { formatDate } from '../../../server/lib/utils';
import { Link } from 'react-router';
import axios from 'axios'
import toast from 'react-hot-toast'

function Notecard ({note,setNotes}) {


const handleDelete=async(e,id)=>{
  e.preventDefault();

if (!window.confirm("Are You Want To Delete")) return;

try {
      await axios.delete(`http://localhost:5000/note/${id}`)
      setNotes((pre)=>pre.filter(note=>note._id !==id))
      toast.success("Note delete successfull")
}
 catch (error) {
  console.log(error);
  toast.error("Failed to delete note")
  
}
};

  return (
    <div className="m-8 font-mono">
      <div className="card bg-primary text-primary-content w-96">
        <Link to={`/note/${note._id}`}>
        <div className="card-body">
          <h2 className="card-title">{note.title}</h2>
          <p>{note.content}</p>
          <span className='text-sm  text-white text-base-content/60'>
          {formatDate(new Date(note.createdAt))}
          </span>
          <div className="card-actions justify-end gap-2">
            <button className="btn btn-ghost min-h-0 h-8 px-2"><PenSquareIcon className='size-5'/></button>
            <button className="btn btn-ghost min-h-0 h-8 px-2" onClick={(e)=>handleDelete(e,note._id)}><Trash2Icon className='size-5 text-[#ff0000]'/></button>
          </div>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Notecard;