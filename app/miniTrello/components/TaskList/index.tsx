import TaskCard from "../TaskCard";
import "./styles.css"

function TaskList(props:any){
    const {state, tasks, id, updateTask, onTaskSelect} = props;
 
    const onTaskDrop = (e: any) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData("text/plain")
        updateTask(taskId, id)
    }

    return (
        <div
            onDragOver={(e)=> e.preventDefault()}
            onDrop={onTaskDrop}
            className="task-list-wrapper" >
            <div className="task-list-heading-container">
                <h3 className="task-list-heading">{state}</h3>
            </div>
            <div className="task-list-container">
                {tasks?.map((task: any)=> <TaskCard onTaskSelect={onTaskSelect} key={task?.id}  {...task} listId={id} />)}
            </div>
        </div>
    )

}

export default TaskList