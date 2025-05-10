import { useEffect, useState } from "react"
import "./styles.css"

function TaskInput(props:any){

    const {saveTask, listKeys, selectedTask, updateTask, addNewList, deleteTask} = props;

    const [inputState, setInputState] = useState<any>({title: '', subTitle: '', listId: listKeys[0]})
    const [listName, setListName] = useState<any>('');

    

    useEffect(()=> {
        console.log(selectedTask);
        if(selectedTask)
            setInputState({...selectedTask})
    }, [selectedTask])

    const creatTask = (type: string, e:any) => {
        let state = {...inputState};
        if(type === 'title'){
            state = {...state, prevListId: state?.prevListId ?? state.listId, title: e?.target.value }
        }
        if(type === 'subTitle'){
            state = {...state, prevListId: state?.prevListId ?? state.listId, subTitle: e?.target?.value}
        }
        console.log(state)
        if(type === 'listId')
            state = {...state, prevListId: state?.prevListId ?? state.listId, listId: e.target.value }
        setInputState(state)
    }

    const submitTask = () => {
        selectedTask ? updateTask({...inputState, prevListId: inputState?.prevListId ?? inputState.listId}) : saveTask({...inputState, prevListId: inputState?.prevListId ?? inputState.listId})
        setInputState({title: '', subTitle: '',  listId: listKeys[0]})
    }

    const onAddList = () => {
        addNewList?.(listName)
        setListName('')
    }

    const onDeleteTask = () => {
        deleteTask(selectedTask)
        setInputState({title: '', subTitle: '',  c: listKeys[0]})
    }

    return (<div>

        <input placeholder="list name" onChange={(e)=> {setListName(e?.target?.value)}}  value={listName}/>
        <button onClick={onAddList}>Add List</button>
        <br/>
        <input placeholder="title" value={inputState?.title} onChange={(e) => creatTask('title', e)}  />
        <input placeholder="subtitle" value={inputState?.subTitle} onChange={(e) => creatTask('subTitle', e)} />
        <select value={inputState?.listId} onChange={(e) => creatTask('listId', e)}>
            {listKeys?.map((key: string)=> <option key={key} value={key} >{key}</option>)}
        </select>
        <button onClick={submitTask}>Submit</button>
        <button onClick={onDeleteTask}>Delete</button>
    </div>)
}

export default TaskInput