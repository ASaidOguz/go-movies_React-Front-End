const Alert=(props)=>{
    return(
        <div className={props.alertType} role="alert">
         {props.alertMessage}
        </div>
    )
}

export default Alert