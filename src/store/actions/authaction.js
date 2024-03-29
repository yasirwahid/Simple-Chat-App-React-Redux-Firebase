import firebase from 'firebase';
import Apphistory from '../../History'

var firebaseConfig = {
    apiKey: "AIzaSyDJ0logGKmPTm2hEomWgyWDgeCt-jmmgH0",
    authDomain: "javascript-class-71652.firebaseapp.com",
    databaseURL: "https://javascript-class-71652.firebaseio.com",
    projectId: "javascript-class-71652",
    storageBucket: "javascript-class-71652.appspot.com",
    messagingSenderId: "332099564061",
    appId: "1:332099564061:web:fe9d951d54ad8626"
  };

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export function signup(email, password, name) {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: 'CHANGE_LOADER' })
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                db.collection("users").add({
                    name,
                    email,
                    uid : user.user.uid,
                }).then(function (docRef) {
                    dispatch({ type: 'LOGGEDIN_USER', payload: { email: user.user.email, uid: user.user.uid , name} });
                    dispatch(userInfo());
                    dispatch({ type: 'CHANGE_LOADER' });
                    Apphistory.push('./chats');
                   
                    })
            })
    }
}









export function signin(email, password) {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: 'CHANGE_LOADER' })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                db.collection("users").where("uid", "==", user.user.uid)
                        .get()
                        .then(function (userSnapshot) {
                            userSnapshot.forEach(function (userDoc) {
                                dispatch({ type: 'LOGGEDIN_USER', payload: { email: userDoc.data().email, uid: userDoc.data().uid , name:userDoc.data().name} });
                                dispatch(userInfo());
                                dispatch({ type: 'CHANGE_LOADER' });
                                Apphistory.push('./chats');
                   
                            });
                        })

            })
    }
}


// function getUsers(){  
//     return(dispatch)=>{
//         var aallUsers = [{}]
//         db.collection("users").get()
//             .then(function (userSnapshot) {
//                 userSnapshot.forEach(function (doc) {
//                     let userNew = {
//                         name: doc.data().name,
//                         uid: doc.data().uid
//                     }
//                     console.log('foreach chala' , userNew)
//                     aallUsers.push(userNew)
//                     console.log("push honay k bad" + aallUsers)
                    
//                     dispatch({ type: '', payload: aallUsers })
//                 });
//             })
//         }
//         }

        var allUsers =[]
        function userInfo(){
       return(dispatch) =>{
           firebase.firestore().collection('users').get().then(snapshot => {
               snapshot.docs.forEach(doc => {
                 const comment = doc.data()
                 allUsers.push(comment)
                })
                
                dispatch({type:'LIST_USERS' , payload:allUsers})
            })
            console.log("all",allUsers)
           console.log("dispatched")
       }
       }

   export function sendMessageToDb(me,you,message){
       return(dispatch)=> {firebase.firestore().collection("messages").add({
            message,
             [me] : true,
             [you] : true,
             sender : me,
            timestamp: Date.now()
        }).then(function (docRef) {
              dispatch( fetchMessages(me,you))
               
            });
        document.getElementById('messageBox').value = '';}

        }


        export function fetchMessages(currentUserUid , oppositionUid){       
            var messagess = []
return(dispatch) =>{
            firebase.firestore().collection('messages').where(currentUserUid, "==", true).where(oppositionUid, "==", true)
            .onSnapshot(function(querySnapshot) {
                querySnapshot.docChanges().forEach(function(doc) {
                    if(doc.type === "added"){
                    //    console.log(doc.doc.data())
                        messagess.push(doc.doc.data())
                    }
                });
                // console.log(messagess)
                  dispatch({type:'GET_MESSAGES' , payload:messagess})
                });

            }
}