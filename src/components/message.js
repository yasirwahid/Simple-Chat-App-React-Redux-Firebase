import React from 'react'
import {connect} from 'react-redux'

class Message extends React.Component{

render(){  
    
const {message, currentUserUid} = this.props
var minutes = Math.floor(message.timestamp / 60000) % 60;
var sec =  Math.floor((message.timestamp / 1000) % 60);

    return(

(message.sender === currentUserUid)?
 (
  
 <div className="message-blue">
     <p className="message-content">{message.message}</p>
     <div className="message-timestamp-left">{minutes+":"+sec}</div>
 </div>):
 (<div className="message-orange">
 <p className="message-content">{message.message}</p>
 <div className="message-timestamp-left">{minutes+":"+sec}</div>
</div>)
        

    )}}

function mapStateToProps(state){
    return {
        currentUserUid: state.basicInfo.uid,
    }
}
function mapDispatchToProps(dispatch){
    return ({
        // fetchMessages: (currentUserUid , oppositionUid) => {
        //     dispatch(fetchMessages(currentUserUid , oppositionUid))
        // }
    })
}

export default connect (mapStateToProps,mapDispatchToProps)(Message)