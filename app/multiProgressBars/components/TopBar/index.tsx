import "./styles.css"

function TopBar(props: any){

    const {onAddPress, onResetPress} = props;


    return (
        <div className="top-nav-wrapper">
            <button className="btn" onClick={onAddPress}>
                Add
            </button>

            <button className="btn" onClick={onResetPress}>
                Reset
            </button>
        </div>
    )
}

export default TopBar