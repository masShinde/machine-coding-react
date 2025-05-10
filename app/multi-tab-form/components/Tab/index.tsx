import type { TabPropTypes } from "./TabPropTypes"
import "./styles.css"

function Tab(props: TabPropTypes){

    const {tabName="", tabKey, onTabChangeHandler } = props

    if(!tabName)
        return null;

    return (<div onClick={() => onTabChangeHandler?.(tabKey)} className="tab-container">
        <h4>{tabName}</h4>
    </div>)

}

export default Tab;