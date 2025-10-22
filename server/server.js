const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const Note=require('../server/model/Note.js')


const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb is connected"))
  .catch(console.error);



// GET DATA




app.get('/note', async (req,res)=>{
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch(error) {
        console.error(error);
        res.status(500).json({message:'oh my god'});
    }
})


// GET DATA BY ID


app.get("/note/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).send("Note not found");
  res.json(note);
});



// POST DATA

app.post('/create', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        return res.status(200).json({ message: 'Note created', note: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }
})


// DELETE DATA

// delete a note
app.delete('/note/:id', async (req, res) => {

  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

// UPDATE DATA

// update a note
app.put('/note/:id', async (req, res) => {
  
  
  try {
    const { title, content } = req.body;
    // { new: true } => return the updated document
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {  title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json('Note updated');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});





app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    })


