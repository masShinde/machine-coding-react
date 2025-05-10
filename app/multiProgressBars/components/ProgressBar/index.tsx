import { useEffect, useRef, useState } from "react"
import "./styles.css"
import type { ProgressBarPropTypes } from "./ProgressBarPropTypes";

function ProgressBar({addIntervalId}: ProgressBarPropTypes){

    const [width, setWidth] = useState(0)
    const intervalRef = useRef<any>(null)

    useEffect(()=> {
        intervalRef.current = setInterval(() => {
            setWidth(prev => prev + 20)
        },1000)
        addIntervalId?.(intervalRef?.current)
        return () => {
            clearInterval(intervalRef?.current)
        }
    },[]);

    useEffect(() => {
        if(width >= 100)
            clearInterval(intervalRef?.current)
    }, [width])

    return <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{width: `${width}%`}}></div>
    </div>
}

export default ProgressBar