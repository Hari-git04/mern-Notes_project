import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Notecard from '../components/Notecard'
import Notenotfound from '../components/Notenotfound';
import axios from 'axios'

function Homepage () {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchnotes=async()=>{
   try {
    const res=await axios.get('http://localhost:5000/note');
    setNotes(res.data)
   } catch (error) {
    console.log(error); 
   }
  };
   fetchnotes();
  }, []);

  return (
    <>
      <Navbar />

    {notes.length===0 && <Notenotfound/>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <Notecard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </>
  )
}

export default Homepage;