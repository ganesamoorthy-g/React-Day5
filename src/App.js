import React, { useState } from 'react';
import Card from './Component/Card';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddTask = () => {
    if (name && description) {
      const newTask = { id: taskId, name, description, status: 'Pending' };
      setTasks([...tasks, newTask]);
      setName('');
      setDescription('');
      setTaskId(taskId + 1);
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  function renderCards(data = [], filterType = 'all') {
    const filteredData =
      filterType === 'all' ? data : data.filter((task) => task.status === filterType);

    return filteredData.map((task, index) => (
      <Card
        key={`${task.id}-${index}`}
        id={task.id}
        name={task.name}
        description={task.description}
        status={task.status}
        onDelete={handleDeleteTask}
        onUpdateStatus={handleUpdateStatus}
      />
    ));
  }

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <>
      <h1 className="heading">Todo List</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        &nbsp; &nbsp; &nbsp;
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        &nbsp; &nbsp; &nbsp;
        <button type="button" className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
        {renderCards(tasks, filterStatus)}
        <div className="filter-container">
          <label htmlFor="filterStatus">Filter by Status:</label>
          <select id="filterStatus" value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
