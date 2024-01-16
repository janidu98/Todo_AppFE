import React, { useState } from 'react'
import CreateTask from './CreateTask';

const ToDoList = ({ onAddTask }) => {

    const [taskVisible, setTaskVisible] = useState(false);

    const taskHandler = () => {
        setTaskVisible(true);
        
    }

    const cancelTaskHandler = () => {
        setTaskVisible(false);
    }

  return (
    <div>
      <div className='header text-center'>
        <h2>Todo List</h2>
        <button onClick={taskHandler} className='btn btn-primary'>New Task</button>
      </div>

      {/* If click New Task button, open the modal */}
      {taskVisible && <CreateTask onAddTask={onAddTask} isVisible={taskVisible} onCancel={cancelTaskHandler}/>}

      <div className='task-container'>

      </div>
    </div>
  )
}

export default ToDoList
