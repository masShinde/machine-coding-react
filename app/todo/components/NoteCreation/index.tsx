import { useEffect, useState } from "react";
import "./styles.css";

function NoteCreation(props: any) {
  const { noteItem, onSubmit, onResetInput } = props;
  const [inputState, setInputState] = useState({ title: "", description: "" });

  useEffect(() => {
    setInputState({
      title: noteItem?.title || "",
      description: noteItem?.description || "",
    });
  }, [noteItem]);

  const onInputChange = (type: string, e: any) => {
    if (type === "title") {
      setInputState({ ...inputState, title: e?.target?.value });
    } else if (type === "description") {
      setInputState({ ...inputState, description: e?.target?.value });
    }
  };

  const onSubmitHandler = () => {
    const { title, description } = inputState;
    onSubmit({
      ...noteItem,
      title,
      description,
    });
    setInputState({ title: "", description: "" });
  };

  return (
    <div className="note-creation-container">
      <input
        value={inputState?.title}
        className="note-creation-input"
        placeholder="Title"
        onChange={(e) => onInputChange("title", e)}
      />
      <input
        value={inputState?.description}
        className="note-creation-input"
        placeholder="Description"
        onChange={(e) => onInputChange("description", e)}
      />
      {!!!(inputState?.title && inputState?.description) && (
        <div className="note-creation-error">Please fill all Details!</div>
      )}
      <button
        className="note-creation-button"
        disabled={!!!(inputState?.title && inputState?.description)}
        onClick={onSubmitHandler}
      >
        {noteItem ? "Edit Note" : "Create Note"}
      </button>
      <button
        className="note-creation-button"
        disabled={!!!(inputState?.title && inputState?.description)}
        onClick={onResetInput}
      >
        Reset
      </button>
    </div>
  );
}

export default NoteCreation;
