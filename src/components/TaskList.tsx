import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}



export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const findTaskById = (id: number):({task: Task, index: number} | null) => {
    const currentTasks = [...tasks];
    let item = null
    let updateIndex = -1;
    const updateTask = currentTasks.find((task, index) => {
      updateIndex=index; 
      return task.id === id
    });
    if(updateTask){
      item = {task: updateTask, index: updateIndex};
    }
    return item;
  }

  function handleCreateNewTask() {

    if(newTaskTitle){
      const newTask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false
      };

      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const currentTasks = [...tasks];
    const updateTask = findTaskById(id);
    if(updateTask) {
      const {task, index} = updateTask;
      task.isComplete = true;
      currentTasks[index] = task;
      setTasks(currentTasks);
    }
  }

  function handleRemoveTask(id: number) {
    const currentTasks = [...tasks];
    const updateTask = findTaskById(id);
    if(updateTask) {
      const {index} = updateTask;
      currentTasks.splice(index, 1);
      setTasks(currentTasks);
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}