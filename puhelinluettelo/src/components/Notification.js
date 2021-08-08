const Notification = ({type, message }) => {

    if(message === null){
        return null
    } else if (message.includes("Success")){
        return (
            <div className="successNotification">
                {message}
            </div>
        )
    } else if(message.includes("Fail")){
        return (
            <div className="failNotification">
                {message}
            </div>
        )
    }

}

export default Notification