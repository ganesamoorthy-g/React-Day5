import React, { useState } from 'react';

function Card({ id, name, description, status, onDelete, onUpdateStatus }) {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ name, description, status });

  const handleEditClick = () => {
    setEditing(true);
    setEditedTask({ name, description, status });
  };

  const handleSaveClick = () => {
    setEditing(false);
    if (onUpdateStatus && typeof onUpdateStatus === 'function') {
      onUpdateStatus(id, editedTask.status);
    }
  };

  const handleDelete = () => {
    if (onDelete && typeof onDelete === 'function') {
      onDelete(id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <li className={`card${editing ? ' editing' : ''}`}>
      <div className="top">
        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
            />
            <select name="status" value={editedTask.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </>
        ) : (
          <>
            <h6>Name: {name}</h6>
            <br />
            <p>Description: {description}</p>
            <p className="card-status">Status: {status}</p>
            
          </>
        )}
      </div>
      <div className="bottom">
        {editing ? (
          <button type="button" className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-success" onClick={handleEditClick}>
              Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default Card;
