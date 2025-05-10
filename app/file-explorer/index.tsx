import { useState } from "react";
import type {
  FileExplorerPropTypes,
  FileFormat,
} from "./FileExplorerPropTypes";
import "./styles.css";

export default function FileExplorer(props: FileExplorerPropTypes) {
  const { data } = props;

  const [explorerState, setExplorerState] = useState(data)

//  const searchPathAndUpdate = (state: any, path:string) => {
//     const pathArr = path.split("."), len = pathArr.length;
//     let current = state;

//     for(let i = 0; i<len-1; i++){
//         const currentKey = pathArr[i];
//         current = current[currentKey]?.children
//     }
//     current = current[pathArr[len-1]]
//     current= {...current, isExpanded: !current?.isExpanded}
//     return state;
//   }

  function updateFileFormat(
    obj: any,
    path: string[],
    shouldDelete = false
  ){
  
    if(path.length === 1){
        const currentObj = obj[path[0]]
        if(shouldDelete)
            delete obj[path[0]]
        else
            obj[path[0]] = {...currentObj, isExpanded: !currentObj?.isExpanded}
    }else{
        const currentKey = path.shift()
        if(currentKey)
            obj.children = updateFileFormat(obj[currentKey].children, path, shouldDelete)
    }
    return obj;
  }

const onItemClickHandler = (path: string, isFolder: boolean, shouldDelete = false) => {
   const updatedState =  updateFileFormat( {...explorerState} , path.split("."), shouldDelete)
   setExplorerState(updatedState)
  }


  const iterate = (root: Record<string, FileFormat>, level: number) => {
    return Object.keys(root)?.map((key: string) => {
        const currentItem = root[key];
        const { children, type, isExpanded, name, path } = currentItem;
        const isFolder = type === 'folder'
        console.log("name", name, isExpanded)
        let childNodes = []
        if(children)
            childNodes = Object.entries(children);
        return (
          <div className="item-container" >
            <div className="parent-container" onClick={()=> onItemClickHandler(path, isFolder, name === "fifth")} > {isFolder && (isExpanded ? "- " : "+ ")} {name}</div>
            {children && childNodes?.length > 0 && type === "folder" && isExpanded ? (
              <div className="children-container">
                {iterate(children, level+1)}
              </div>
            ) : null}
          </div>
        );
      });
    
  };

  return <div className="explorer-container">
    {iterate(explorerState, 0)}
  </div>;
}
