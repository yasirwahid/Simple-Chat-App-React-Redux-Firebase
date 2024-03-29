import React from 'react'
import {connect} from 'react-redux'
import {sendMessageToDb} from '../store/actions/authaction'
import {fetchMessages} from '../store/actions/authaction'
import Message from './message'
 
class ShowMessages extends React.Component{

    istyle ={
        float : "bottom",
        width:"50%"

    }
    bstyle ={
        width:"5%",
        float:"right",
        display: "inline ",
paddingLeft:"150px",
textAlign:"left"

    }
       state={
           message : '',
     
       }
       
   
   messageHandler(event){
    this.setState({
        message : event.target.value
    })
   }

sendMessage(me,you,message){
    this.props.sendMessageToDb(me,you,message)
}

componentDidMount(){
    var {currentUserUid , oppositionUid } = this.props
    this.props.fetchMessages(currentUserUid , oppositionUid)
}
getDerivedStateFromProps(prevProps,nextState){
    var {currentUserUid , oppositionUid } = this.props
if(prevProps.length !== nextState.length){
    this.props.fetchMessages(currentUserUid , oppositionUid)
}
}
componentDidUpdate(prevProps) {
    
    var {currentUserUid , oppositionUid,allMessages } = this.props
    if (this.props.oppositionUid !== prevProps.oppositionUid) {
        this.props.fetchMessages(currentUserUid , oppositionUid)
    }
    
    else if (allMessages.length !== prevProps.allMessages.length){
        this.props.fetchMessages(currentUserUid , oppositionUid)
        
}
  }
render(){  
var  {allMessages}   = this.props;

    return(
        <div>
        <h1>{this.props.oppositionName}</h1>
        { console.log( "message is " + allMessages)  } 
        {
           
        (allMessages.length !== 0)?(allMessages.map((message,index)=>
        <Message key = {index} message = {message}/>
    ))
        :null}

            <input id='messageBox' type="text" onChange={this.messageHandler.bind(this)} style={this.istyle} />
            <button onClick={this.sendMessage.bind(this,this.props.currentUserUid,this.props.oppositionUid, this.state.message)} style={this.bstyle} className="sendButton">Send</button>
        </div>
       
       
    )}
}

function mapStateToProps(state){
    return {
        oppositionUid: state.basicInfo.oppositionUid,
        oppositionName: state.basicInfo.oppositionName,
        currentUserUid: state.basicInfo.uid,
        allMessages : state.basicInfo.messages
    }
}
function mapDispatchToProps(dispatch){
    return ({
        fetchMessages: (currentUserUid , oppositionUid) => {
            dispatch(fetchMessages(currentUserUid , oppositionUid))
        },
        sendMessageToDb : (me,you,message) =>{
            dispatch (sendMessageToDb(me,you,message) )
        }
    })
}

export default connect (mapStateToProps,mapDispatchToProps)(ShowMessages)