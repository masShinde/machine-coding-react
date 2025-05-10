


export default function List(props:any){

    const {root} = props
    return (
        <>
    { Object.keys(root)?.map((key: string) => {
        const currentItem = root[key];
        const { children, type, isExpanded, name, path } = currentItem;
        const isFolder = type === 'folder'
        let childNodes = []
        if(children)
            childNodes = Object.entries(children);
        return (
          <div className="item-container" >
            <div className="parent-container" onClick={()=> onItemClickHandler(path, type === 'folder')} > {(isExpanded && isFolder) ? "- " : "+ "} {name}</div>
            {children && childNodes?.length > 0 && type === "folder" && isExpanded ? (
              <div className="children-container">
                {iterate(children, level+1)}
              </div>
            ) : null}
          </div>
        );
      })}
        </>
    )
}