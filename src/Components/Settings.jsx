import './css/Settings.css'
function Settings(props){

    return(
        <div className={"Settings SettingsMenu" + props.active}>
            <div className="SettingsButtons"><i class="fa-solid fa-display"></i><span>Display</span></div>
            <div className="SettingsButtons"><i className="fa-solid fa-volume-high"></i><span>Sound</span></div>
            <div className="SettingsButtons"><i class="fa-regular fa-database"></i><span>Storage</span></div>
            <div className="SettingsButtons"><i class="fa-solid fa-info"></i><span>About</span></div>
        </div>
    )
}

export default Settings;