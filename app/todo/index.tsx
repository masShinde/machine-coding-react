import Note from "./components/Note";
import "./styles.css";
import { defaultProps } from "./data";
import { useEffect, useState } from "react";
import NoteCreation from "./components/NoteCreation";
import NoteSearch from "./components/NoteSearch";

function Todo() {
  const [defaultList, setDefaultList] = useState(defaultProps);
  const [todoList, setTodoList] = useState(defaultProps);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  const onEdit = (selectedItem: any) => {
    setSelectedItem({ ...selectedItem });
  };

  const filterTodos = (key: any, list: any) => {
    if (key) {
      return [...list]?.filter(
        (note) =>
          note?.title?.toLowerCase()?.includes(key) ||
          note?.description?.toLowerCase()?.includes(key)
      );
    } else {
      return [...list];
    }
  };

  const onDelete = (selectedItem: any) => {
    const { id } = selectedItem;
    const list = [...defaultList];
    const selectedItemIndex = list?.findIndex((item) => item?.id === id);
    list.splice(selectedItemIndex, 1);
    setTodoList(filterTodos(searchKey?.trim(), list));
    setDefaultList(list);
  };

  const onPinToggle = (selectedItem: any) => {
    const { id, isPinned } = selectedItem;
    const list = [...defaultList];
    const selectedItemIndex = list?.findIndex((item) => item?.id === id);
    list.splice(selectedItemIndex, 1);
    if (isPinned) {
      list.push({ ...selectedItem, isPinned: false });
    } else {
      list.unshift({ ...selectedItem, isPinned: true });
    }
    setTodoList(filterTodos(searchKey?.trim(), list));
    setDefaultList(list);
  };

  const onNoteSubmit = (selectedItem: any) => {
    const { id, title, description, ...restProps } = selectedItem;
    if (id) {
      const list = [...defaultList];
      const selectedItemIndex = list?.findIndex((item) => item?.id === id);
      const targetNote = list.splice(selectedItemIndex, 1)?.[0];
      list.splice(selectedItemIndex, 0, { ...targetNote, title, description });
      setTodoList(filterTodos(searchKey?.trim(), list));
      setDefaultList(list);
    } else {
      const updatedList = [
        ...defaultList,
        {
          title,
          description,
          isPinned: false,
          id: Date.now(),
          ...restProps,
        },
      ];
      setDefaultList(updatedList);
      setTodoList(filterTodos(searchKey?.trim(), updatedList));
    }
  };

  const onResetInput = () => {
    setSelectedItem(null);
  };

  const onSeachKey = (searchKey: any) => {
    const trimmedVal = searchKey?.trim();
    setSearchKey(trimmedVal);
    setTodoList(filterTodos(trimmedVal, defaultList));
  };

  return (
    <div className="todo-container">
      <NoteCreation
        onResetInput={onResetInput}
        noteItem={selectedItem}
        onSubmit={onNoteSubmit}
      />
      <NoteSearch onSeachKey={onSeachKey} />
      {todoList?.map((note) => (
        <Note
          onEdit={onEdit}
          onDelete={onDelete}
          onPinToggle={onPinToggle}
          key={note?.id}
          noteItem={note}
        />
      ))}
    </div>
  );
}

export default Todo;
