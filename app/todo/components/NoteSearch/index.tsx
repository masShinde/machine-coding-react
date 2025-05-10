import useDebouncedVal from "~/customHooks/useDebouncedVal";
import "./styles.css";
import { useEffect, useState } from "react";

function NoteSearch(props: any) {

  const {onSeachKey} = props
  const [debouncedSearchKey, setDebouncedSearchKey] = useDebouncedVal("", 500);
  const [searchKey, setSearchKey] = useState('')

  useEffect(()=> {
    onSeachKey?.(debouncedSearchKey)
  },[debouncedSearchKey])

  return (
    <div className="note-search-container">
      <input
        onChange={(e) => {
            console.time('a')
            const val = e?.target?.value
            setSearchKey(val)
            setDebouncedSearchKey(val)
        }}
        value={searchKey}
        placeholder="Type search keyword"
        className="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;
