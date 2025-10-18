import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { formatDate } from '../../../server/lib/utils';
import { Link } from 'react-router'; 
import axios from 'axios'
import toast from 'react-hot-toast'

function Notecard ({note,setNotes}) {

  const handleDelete=async(e,id)=>{
    e.preventDefault();

    if (!window.confirm("Are You Sure You Want To Delete?")) return;

    try {
      await axios.delete(`http://localhost:5000/note/${id}`)
      setNotes((pre)=>pre.filter(note=>note._id !==id))
      toast.success("Note deleted successfully")
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to delete note")
    }
  };

  return (
    <div className="m-4 font-mono flex justify-center">
      <div className="card bg-primary text-primary-content w-full max-w-sm sm:max-w-md md:max-w-lg">
        <Link to={`/note/${note._id}`}>
          <div className="card-body flex flex-col gap-2">

            <h2 className="card-title text-lg sm:text-xl truncate">{note.title}</h2>

            <p className="text-sm sm:text-base line-clamp-3 break-words">{note.content}</p>

            <span className='text-xs sm:text-sm text-white text-base-content/60'>
              {formatDate(new Date(note.createdAt))}
            </span>

            <div className="card-actions flex flex-col sm:flex-row justify-end gap-2 mt-2">
              <button className="btn btn-ghost min-h-0 h-8 px-2">
                <PenSquareIcon className='size-5'/>
              </button>
              <button 
                className="btn btn-ghost min-h-0 h-8 px-2" 
                onClick={(e)=>handleDelete(e,note._id)}
              >
                <Trash2Icon className='size-5 text-[#ff0000]'/>
              </button>
            </div>

          </div>
        </Link>
      </div>
    </div>
  )
}

export default Notecard;
