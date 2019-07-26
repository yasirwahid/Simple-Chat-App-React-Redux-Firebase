import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserDetails from './userDetails'

import ShowMessages from './showMessages'

import '../custom.css'

class Chats extends Component {
    

 
    
    render() {
        return (
            <div>
                <h1>Hello {this.props.currentUserName}</h1>
                <div className = 'mainDiv'>
                    <div className = 'innerLeft'>
                    {this.props.allUsers.map((user,index)=>
                    (user.uid !== this.props.currentUserUid)?
                    (<UserDetails key={index} user =  {user}/>):null)
                    }
                    </div>
                    <div className = 'innerRight'>
                    {(this.props.oppositionUid !== '') ?
                    (<ShowMessages opposition = {this.props.oppositionUid} myUid = {this.props.currentUserUid}/>)
                    :(<h1>Click on any chat</h1>)
                    }
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        currentUserName: state.basicInfo.username,
        curretUserEmail: state.basicInfo.email,
        currentUserUid: state.basicInfo.uid,
        allUsers : state.basicInfo.allUsers,
        oppositionUid: state.basicInfo.oppositionUid,
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        // getUsers: () => {
        //     dispatch(getUsers())
        // }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Chats);













































