import React, { useState } from 'react'
import './CreateTask.css'

const CreateTask = ({ onAddTask, isVisible, onCancel, currentTodo=null, update, updateTaskHandler }) => {

    const [enterTitle, setEnterTitle] = useState(currentTodo && currentTodo.title ? currentTodo.title : '');
    const  [enterDescription, setEnterDescription] = useState(currentTodo && currentTodo.description ? currentTodo.description : '');

    //when changing title, it saves in enterTitle
    const titleChangeHandler = (event) => {
        event.preventDefault();
        setEnterTitle(event.target.value);
    }

    //when changing description, it saves in enterDescription
    const descriptionChangeHandler = (event) => {
        event.preventDefault();
        setEnterDescription(event.target.value);
    }

    //when clicking update button, pass to the current todo id and new title and description
    const updateHandler = () => {
        updateTaskHandler(
            {
                id: currentTodo.id,
                title: enterTitle,
                description: enterDescription
            }
        );
    }

    const saveHandler = () => {
        //check input fields are empty or not
        if(enterTitle.trim().length === 0 || enterDescription.trim().length === 0) {
            alert('All fields are required!');
            return;
        }

        //pass new title and description to save
        onAddTask(enterTitle, enterDescription);
        //clear the fields
        setEnterTitle('');
        setEnterDescription('');
        //close the modal 
        onCancel();
    }

  return (
    <>
    {/* when opening the modal, background is blur */}
      <div className='backdrop' onClick={onCancel} />

    {/* If isVisible is true, display save button. If update is true, display update button */}
      {(isVisible || update) && 
        <div className='card'>
            {update ? <h2>Update Todo List</h2> : <h2>New Todo List</h2>}

            <form>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text"
                    required
                    id='title'
                    value={enterTitle}
                    onChange={titleChangeHandler}  
                />

                <label htmlFor="title">Description:</label>
                <input 
                    type="text"
                    required
                    id='description'
                    value={enterDescription}
                    onChange={descriptionChangeHandler}  
                />
            </form>
            <div className='buttons'>
                <button className="btn btn-primary btn_change" onClick={update ? updateHandler : saveHandler}>{update ? <p>Update</p> : <p>Save</p>}</button>
                <button className="btn btn-secondary btn_change" onClick={onCancel}><p>Cancel</p></button>
            </div>
        </div>
        }
    </>
  )
}

export default CreateTask
