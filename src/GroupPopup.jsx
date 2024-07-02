
import React, { useState } from 'react';

const GroupPopup = ({ onClose, onAddGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('rgba(179, 139, 250, 1)');

  const handleAddGroup = () => {
    if (groupName.trim() === '') return;
    onAddGroup(groupName, selectedColor);
    setGroupName('');
    setSelectedColor('rgba(179, 139, 250, 1)');
    onClose();
  }
  
  const colors = [
    "rgba(179, 139, 250, 1)",
    "rgba(255, 121, 242, 1)",
    "rgba(67, 230, 252, 1)",
    "rgba(241, 149, 118, 1)",
    "rgba(0, 71, 255, 1)",
    "rgba(102, 145, 255, 1)"
  ];


  return (
      <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2 className='title'>Create New Notes Group</h2>
        <div className='group-name'>
        <label htmlFor='groupname' className='name1'>Group Name</label>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        </div>
        
        <div className="color-options">
        <label htmlFor='groupcolor' className='name2'>Choose Color</label>
          {colors.map((color, index) => (
            <div
              key={index}
              className={`color-option ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <button className='create' onClick={handleAddGroup}>Create</button>
      </div>
    </div>
  );
};

export default GroupPopup;

