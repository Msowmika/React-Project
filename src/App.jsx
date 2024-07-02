// App.js
import React, { useEffect, useState } from 'react';
import GroupList from './groupList';
import GroupPopup from './GroupPopup';
import NoteInput from './NoteInput';
import NoteList from './noteList';
import './index.css';
import image1 from './bg.png'
import image2 from './Vector (7).png';
import backbutton from './Vector (8).png';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setGroups(storedGroups);
    setNotes(storedNotes);

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const saveGroupsToLocalStorage = (groups) => {
    localStorage.setItem('groups', JSON.stringify(groups));
  };

  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  const generateGroupAcronym = (groupName) => {
    const formattedName = groupName.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (formattedName.length >= 2) {
      const firstChar = formattedName.charAt(Math.floor(Math.random() * formattedName.length));
      const secondChar = formattedName.charAt(Math.floor(Math.random() * formattedName.length));
      return firstChar + secondChar;
    }
    return 'NA';
  };

  const handleAddGroup = (groupName, selectedColor) => {
    const acronym = generateGroupAcronym(groupName);
    const newGroup = { id: Date.now(), name: groupName, color: selectedColor, acronym: acronym };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    saveGroupsToLocalStorage(updatedGroups);
    setIsPopupOpen(false);
  };

  const handleAddNote = (noteText) => {
    if (!selectedGroup) return;
    const newNote = {
      id: Date.now(),
      groupId: selectedGroup.id,
      text: noteText,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  return (
    <div className={`app-container ${selectedGroup ? 'group-selected' : ''}`}>
      <div className='groupcontainer'>
        <h1 className='heading'>Pocket Notes</h1>
      {!selectedGroup || !isMobileView ? (
        <GroupList
          groups={groups}
          onAddGroup={() => setIsPopupOpen(true)}
          onSelectGroup={handleSelectGroup}
        />
      ) : (
        <button className="back-button" onClick={handleBackToGroups}><img src={backbutton}></img> </button>
      )}</div>
      <div>
<div className='notescontainer'>
      {selectedGroup ? (
        <><h2 className="group-title"><div className='acronym' style={{backgroundColor: selectedGroup.color}}>{selectedGroup.acronym}</div><div className='groupname'>{selectedGroup.name}</div></h2>
          <div className='noteinput'>
          <NoteInput onAddNote={handleAddNote} /></div>
          <div className='notelist'>
          <NoteList notes={notes.filter(note => note.groupId === selectedGroup.id)} />
          </div>
        </>
      ) : (
        <div className="empty-note-list">
          <img className='empty-image'src={image1} alt="No group selected" />
          <div>
          <h1 className='empty-heading'>Pocket Notes</h1>
          <p className='para1'>Send and receive messages without keeping your phone online.</p>
          <p className='para1'>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <p className='para2'><img className='lock'src={image2}></img>end-to-end encrypted</p>
          </div>
        </div>
      )}</div>
      {isPopupOpen && <GroupPopup onClose={() => setIsPopupOpen(false)} onAddGroup={handleAddGroup} />}</div>
    </div>
    
  );
};

export default App;
