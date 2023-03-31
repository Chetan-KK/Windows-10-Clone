import './css/Display.css'

function Display(props){
    return(
        <div className={'Display DisplayMenu'+props.active}>
            <div className="DisplayButtons"><i className="fa-regular fa-sun"></i><span>Brightness</span></div>
            <div className="DisplayButtons"><i className="fa-regular fa-image"></i><span>Wallpaper</span></div>
            <div className="DisplayButtons"><i className="fa-sharp fa-solid fa-memory"></i><span>Graphics</span></div>
        </div>
    )
}

export default Display;