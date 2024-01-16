import React, { useEffect, useState } from 'react'
import ToDoList from './ToDoList';
import TaskLists from './TaskLists';
import CreateTask from './CreateTask';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTasks = () => {

  //dummy data for testing purposes
  const dummyTask = [
    {
        id: 1,
        title: "Title 1",
        desc: "description 1"
    },
    {
        id: 2,
        title: "Title 2",
        desc: "description 2"
    },
    {
        id: 3,
        title: "Title 3",
        desc: "description 3"
    },
    {
        id: 4,
        title: "Title 4",
        desc: "description 4"
    },
    {
        id: 5,
        title: "Title 5",
        desc: "description 5"
    },
  ]

  const [tasks, setTasks] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  //when loading the page, display all the todos
  useEffect(() => {  
    getTasks();   
  }, []);

  //Get all todos
  const getTasks = () => {
    axios.get('https://localhost:7001/api/Todo')
    .then((result) => {
        setTasks(result.data);
        console.log(result.data);
    })
    .catch((error) => {
        console.log(error);
    })
  }

  //Add a new todo
  const addTaskHandler = (newTitle, newDesc) => {

    const url = 'https://localhost:7001/api/Todo';

    const newAndAllTasks =  
        {
            "title": newTitle,
            "description": newDesc,
            //id: tasks.length ? (tasks[tasks.length-1].id + 1) : 1
        }

    axios.post(url, newAndAllTasks)
    .then((result) => {
        getTasks();
        toast.success('Todo has been added');
    })
    .catch(error => {
        toast.error(error);
    })
  }

  //Edit a todo
  const updateTaskHandler = (todo) => {
    
    axios.put(`https://localhost:7001/api/Todo/${todo.id}`, todo)
    .then((result) => {
        if(result.status === 200){
            getTasks();
            toast.success('Todo has been updated');
            //After updating close the modal
            setCurrentTodo(null);
            setIsUpdating(false);
        }
    })
    .catch((error) => {
        toast.error(error);
    })
    
  }

  //when clicking update button, open the update modal
  const handleUpdateModalOpen = (id) => {
    const updateTodo = tasks.find(task => task.id === id);

    setCurrentTodo(updateTodo);
    setIsUpdating(true);
  }

  //when clicking close button, close the update modal
  const handleUpdateModalClose = () => {
    setCurrentTodo(null);
    setIsUpdating(false);
  }

  //Delete a todo
  const deleteTaskHandler = (id) => {
    if(window.confirm('Are you sure to delete this todo list?') == true){
        axios.delete(`https://localhost:7001/api/Todo/${id}`)
        .then((result) => {
            if(result.status === 200){
                getTasks();
                toast.success('Todo has been deleted');
            }
        })
        .catch((error) => {
            toast.error(error);
        })
    }
    
  }

  return (
    <>
        <ToastContainer />

        <ToDoList onAddTask={addTaskHandler}/>

        <TaskLists tasks={tasks} handleUpdateModeOpen={handleUpdateModalOpen} deleteTaskHandler={deleteTaskHandler}/>

        {/* If isUpdating state is true */}
        {isUpdating && <CreateTask update currentTodo={currentTodo} onCancel={handleUpdateModalClose} updateTaskHandler={updateTaskHandler}/>}
        
        {/* If no any todos in database, display a msg */}
        {(tasks.length === 0) && <h3 className='text-center mt-5'>No Any Todo to Display</h3>}

    </>
  )
}

export default AllTasks
