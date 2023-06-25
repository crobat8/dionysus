import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  
  deleteField,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Friends = () =>{ 

    const{currentUser} = useContext(AuthContext);
    
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const [loading1,setLoading1] =useState(true);
    const [loading2,setLoading2] =useState(true);
    const [loading3,setLoading3] =useState(true);

    const [requests,setRequests] = useState([]);
    const [myData,setMyData]     = useState([])
    const [friends,setFriends]   = useState([]);

    const handleSearch = async () => {
        const q = query(
          collection(db, "users"),
          where("displayName", "==", username)
        );
    
        try {
          const querySnapshot = await getDocs(q);
          
            querySnapshot.forEach((doc) => {
            setUser(doc.data());
            
          });
        } catch (err) {
          setErr(true);
        }
      };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };
    const sendRequest = async (e) =>{
        console.log(user)
        var requestName;
        if(currentUser.uid>user){
            requestName = user.uid+currentUser.uid
        }else{
            requestName = currentUser.uid+user.uid
        }
        const userHolder ={
            displayName:currentUser.displayName,
            email:currentUser.email,
            photoURL:currentUser.photoURL,
            uid:currentUser.uid,
        }
        console.log(user)
        try{
            
            await setDoc(doc(db, "Request", requestName), {
                to:user.uid,
                toInfo:user,
                from:currentUser.uid,
                fromInfo:userHolder,
              });
              alert("event was succesfully added");
        }catch(err){
            alert(err)
        }
    }

    const requestRef = query(collection(db,"Request")
                            ,where("to","==",currentUser.uid))
    onSnapshot(requestRef,(snapshot)=>{
        setRequests(snapshot.docs.map(doc=>doc.data()))

        setLoading1(false)
    })
    
    const meRef = query(collection(db,"users")
                        ,where("uid","==",currentUser.uid))
    onSnapshot(meRef,(snapshot)=>{
        setMyData(snapshot.docs.map(doc=>doc.data()))
        
        setLoading2(false)
    })
    
    if(loading2){

    }else{
        const friendIds = Object.values(myData[0].friends)
        const friendsRef = query(collection(db,"users")
                            ,where("uid","in",friendIds))
        onSnapshot(friendsRef,(snapshot)=>{
            setFriends(snapshot.docs.map(doc=>doc.data()))
        
            setLoading3(false)
        })
    }
    

    const removeRequst = (incomming) =>{
        var requestsearch;
        if(incomming>currentUser.uid){
            requestsearch = currentUser.uid+incomming
        }else{
            requestsearch = incomming+currentUser.uid
        }
        deleteDoc(doc(db,"Request",requestsearch))
        
        
    }

    const confirm = (event,incomming)=>{
        var friendsPlaceHolder1 = "friends."+incomming;
        const meRef = doc(db,"users",currentUser.uid)
        updateDoc(meRef,{
            [friendsPlaceHolder1]:incomming
        });

        var friendsPlaceHolder2 = "friends."+currentUser.uid;
        const themRef = doc(db,"users",incomming)
        updateDoc(themRef,{
            [friendsPlaceHolder2]:currentUser.uid
        });

        removeRequst(incomming);

    }

    if(loading1||loading2||loading3){
        return(
            <h1>
                friends Loading
            </h1>
        )
    }else {
        
    }
    return (
        <div className="Friends">
            <div className='left'>
                <h1>
                    Requests
                </h1>
                <div className="requests">
                    
                    {requests.map((e,i)=>{
                        return(
                            <div className="request">
                                <img src={e.fromInfo.photoURL} alt="" />
                                <p>
                                    {e.fromInfo.displayName}
                                </p>
                                <button onClick={(event)=>confirm(event,e.from)}>
                                    confirm
                                </button> 
                                <button>
                                    delete
                                </button> 
                            </div>
                        )
                    })}
                </div>
                
                <h1>
                    My Friends
                </h1>
                <div className="people">
                    {friends.map((e,i)=>{
                        
                        return(
                            <div className="person" >
                                <img src={e.photoURL} alt="" />
                                <p>
                                    {e.displayName}
                                </p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
            <div className='right'>
                <h1>
                    Find Friends
                </h1>
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="addinput"
                />
                {err && <span>User not found!</span>}
                {user && (
                    <div className="add" >
                        <img src={user.photoURL} alt="" width={"100%"}/>
                        <div className="userChatInfo">
                            <span>{user.displayName}</span>
                            <button onClick={sendRequest} >
                                add user as friend
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Friends;