import { MdEdit, MdDelete, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import "./styles.css"

function Note(props: any){

    const {noteItem, onEdit, onDelete, onPinToggle} = props

    const {title , description, isPinned} = noteItem || {}

    const onEditHandler = () => {
        onEdit(noteItem)
    }

    const onDeleteHandler = () => {
        onDelete(noteItem)
    }

    const onPinToggleHandler = () => {
        onPinToggle(noteItem)
    }


    return (
        <div className="note-container">
            <div className="title-container">
                <h4>{title}</h4>
                <div className="pin-wrapper" onClick={onPinToggleHandler}>
                    {isPinned ? <MdOutlineStarPurple500 size={25}/> : <MdOutlineStarOutline size={25} />}
                </div>
            </div>
         
            <div className="description-container">
                <h4>{description}</h4>
            </div>
            <div className="operation-container">
                <MdEdit className="note-icon"  size={25}  onClick={onEditHandler} />
                <MdDelete className="note-icon" size={25} onClick={onDeleteHandler}/>
            </div>
        </div>
    )
}

export default Note;