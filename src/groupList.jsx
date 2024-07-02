import React from 'react';



const GroupList = ({ groups, onAddGroup, onSelectGroup }) => {
  
  
  return (
    <div className='grouplist'>
      <button className='groupcreatebutton' onClick={onAddGroup}> &nbsp;&nbsp;+ Create Notes group</button>
      <ul>
        {groups.map(group => (
          <li key={group.id} onClick={() => onSelectGroup(group) }  className='groupitem'>
           <span className='acronym' style={{ backgroundColor: group.color}}> {group.acronym}</span> <div className='groupname'>{group.name}</div> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;



