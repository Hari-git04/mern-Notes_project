import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Notecard from '../components/Notecard'
import Notenotfound from '../components/Notenotfound';
import axios from 'axios'

function Homepage () {
  const [notes, setNotes] = useState([]);

  const getApiBase = () => {
    return import.meta?.env?.VITE_API_URL || 'http://localhost:5000';
  };

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const base = getApiBase();
        const res = await axios.get(`${base}/note`);
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
      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <Notecard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </>
  )
}

export default Homepage;