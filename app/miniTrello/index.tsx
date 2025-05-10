import { useRef, useState } from "react";
import "./styles.css";
import TaskList from "./components/TaskList";
import { tasksObj } from "./data";
import TaskInput from "./components/TaskInput";

function MiniTrello() {
  const [tasks, setTasks] = useState<any>(tasksObj);
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const updateTask = (id: string, targetListId: string) => {
    const ids = id?.split(".")
    const listId = ids[0];
    const taskId = ids[1];
    const currentList = {...tasks?.[listId]}
    const taskIndex = currentList?.tasks?.findIndex(item => item.id === taskId)
    const targetTask = currentList?.tasks?.splice(taskIndex, 1)[0]
    const updatedTargetList = tasks?.[targetListId]
    updatedTargetList?.tasks?.push(targetTask)
    const updatedTaskObj = {...tasks, [targetListId]: updatedTargetList, [listId]: currentList}
    setTasks(updatedTaskObj);
  }

  const onTaskSelect = (task:any) => {
    setSelectedTask({...task})
  }

  const updateTaskObj = (task: any) => {
    const {id, prevListId, listId, ...restProps} = task
    console.log(prevListId, listId)
    if(prevListId !== listId){
        const currentList = {...tasks?.[prevListId]}
        const taskIndex = currentList?.tasks?.findIndex(item => item.id === id)
        const targetTask = currentList?.tasks?.splice(taskIndex, 1)[0]
        const updatedTargetList = {...tasks?.[listId]}
        updatedTargetList?.tasks?.push({targetTask,...restProps})
        const updatedTaskObj = {...tasks, [listId]: updatedTargetList, [prevListId]: currentList}
        setTasks(updatedTaskObj);
    }else{
        const currentList = {...tasks?.[prevListId]}
        const taskIndex = currentList?.tasks?.findIndex(item => item.id === id)
        const taskList = [...currentList?.tasks]
        taskList?.splice(taskIndex, 1)[0]
        taskList?.splice(taskIndex, 0, {id, ...restProps})
        const updatedTargetList = {...tasks?.[listId], tasks: taskList}
        const updatedTaskObj = {...tasks, [prevListId]: updatedTargetList}
        setTasks(updatedTaskObj);
    }
    setSelectedTask(null)
  }

  const saveTask = (task:any) => {
    const {listId, title, subTitle} = task
    const targetList = {...tasks[listId]}
    const newTask = {id: title?.toLowerCase()?.split(' ')?.join('-'), title: title, subTitle: subTitle}
    targetList?.tasks?.push(newTask);
    const updatedTaskObj = {...tasks, [listId]: targetList}
    setTasks(updatedTaskObj);
  }

  const addNewList= (listName: string) => {
    const t = {...tasks}
    const listId = listName?.replaceAll(' ','')
    t[listId] = {id: listId , tasks: [], state: listName}
    setTasks({...t})
  }

  const deleteTask = (task:any) => {
    const {listId, id} = task
    const selectedList = {...tasks[listId]}
    const taskList = selectedList?.tasks
    const index = taskList?.findIndex(item => item.id === id)
    taskList.splice(index, 1)
    const updatedList = {...selectedList, tasks: taskList}
    setTasks({...tasks, [listId]: updatedList})
  }

  return (
    <div >
        <TaskInput saveTask={saveTask} listKeys={Object.keys(tasks)} updateTask={updateTaskObj} addNewList={addNewList} deleteTask={deleteTask} selectedTask={selectedTask} />
        <div className="trello-container">
            {Object.keys(tasks).map((key) => {
                const taskListObj: any = tasks?.[key] || {};
                if(taskListObj?.tasks?.length > 0) 
                    return <TaskList key={key}{...taskListObj} onTaskSelect={onTaskSelect} updateTask={updateTask}  />;
                return null;
            })}
        </div>
    </div>
  );
}

export default MiniTrello;
