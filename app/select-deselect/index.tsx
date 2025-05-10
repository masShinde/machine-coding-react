import { useEffect, useState } from "react";
import type { Box, SelectDeSelectPropTypes } from "./SelectDeSelectPropTypes";
import "./styles.css";

function SelectDeSelect(props: SelectDeSelectPropTypes) {
    const { data } = props;

    const [boxes, setBoxes] = useState(data)
    const [stack, setStack] = useState<number[]>([])
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        let count = 0;
        data?.forEach(row => row?.forEach(box => count++))
        setTotalCount(count)
    }, [data])

    const removeSelection = () => {
        for(let i = 0; i< totalCount && stack.length > 0; i++){
            const currentIndex = stack.pop()
            setTimeout(()=> {
                setBoxes(prevState => getUpdatedBoxes(prevState, currentIndex ?? -1))
            }, (i + 1) * 1000)
        }
    }

    const getUpdatedBoxes = (boxes: Box[][], index: number) => {
        return boxes?.map((row) => {
            return row?.map((box) => {
                if(box?.currentIndex === index)
                    return {...box, isSelected : !box?.isSelected}
                return box
            })
        })
    }

    const handleOnBoxClick = (index: number) => {
        const stackIndex = stack.indexOf(index)
        
        if(stackIndex > -1){
            const updatedStack = [...stack?.splice(0, stackIndex),  ...stack?.splice(stackIndex+1)   ]
            setStack(updatedStack)
        }else{
            stack.push(index)
        }
        const updatedBoxes = getUpdatedBoxes(boxes, index)
        setBoxes(updatedBoxes)

        if(stack?.length >= totalCount){
            removeSelection()
        }
    }

  return (
    <div className="div-container">
      {boxes?.map((row, i) => {
        return (
          <div className="div-row">
            {row?.map((box, j) => {
              const { currentIndex, activeColor, inActiveColor, isSelected } =
                box;
              return (
                <div
                    onClick={() => handleOnBoxClick(currentIndex)}
                  className="row-box"
                  style={{
                    backgroundColor: isSelected ? activeColor : inActiveColor,
                  }}
                >
                  {currentIndex + 1}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default SelectDeSelect;
