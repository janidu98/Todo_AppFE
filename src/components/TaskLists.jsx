import React from 'react'
import './TaskLists.css'

const TaskLists = (props) => {

    //When clicking update button, pass current todo's id for identifying displaying that todo details
    const handleTodoUpdate = (id) => {
        props.handleUpdateModeOpen(id);
    }

    //To delete a todo, pass that todo's id
    const handleTodoDelete = (id) => {
        props.deleteTaskHandler(id);
    }

  return (
    <>
      <div className='tasks'>
        {props.tasks.map((task) => 
            
          <div key={task.id} className='shadow'>
              <h3><u>{task.title}</u></h3>
              <p>{task.description}</p>
              <div className='d-flex justify-content-center taskBtn'>
                  <button className='btn btn-success m-1' onClick={() => handleTodoUpdate(task.id)}><i class="bi bi-pencil-square"></i></button>
                  <button className='btn btn-danger m-1' onClick={() => handleTodoDelete(task.id)}><i class="bi bi-trash"></i></button>
               </div>
          </div>
            
        )}
      </div>
    </>
  )
}

export default TaskLists
