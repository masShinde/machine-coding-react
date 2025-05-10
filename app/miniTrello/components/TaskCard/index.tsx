import "./styles.css"

function TaskCard(props: any){
    const {title, subTitle, id, listId, onTaskSelect} = props;
    
    return (
        <div draggable 
            onDragStart={(e)=> {
                e.dataTransfer.setData("text/plain", `${listId}.${id}`)
            }}  
            onClick={() => onTaskSelect({title, subTitle, id, listId})}
            className="task-card">
            <h4 className="task-card-title">{title}</h4>
            <p className="task-card-subtitle">{subTitle}</p>
        </div>
    )
}

export default TaskCard;