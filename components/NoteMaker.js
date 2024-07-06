import { useState } from 'react';

const NoteMaker = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    setNotes([...notes, { text: newNote, status: 'todo' }]);
    setNewNote('');
  };

  const changeStatus = (index, status) => {
    const updatedNotes = notes.map((note, i) => i === index ? { ...note, status } : note);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add a new note"
      />
      <button onClick={addNote}>Add Note</button>
      <div className="mt-4">
        {notes.map((note, index) => (
          <div key={index}>
            <span>{note.text}</span>
            <select
              value={note.status}
              onChange={(e) => changeStatus(index, e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            </div>
             ))}
           </div>
         </div>
       );
     };

     export default NoteMaker;