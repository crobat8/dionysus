import React, { useContext, useState } from "react";
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
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Friends = () =>{ 

    const{currentUser} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

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

    return (
        <div className="Friends">
            <div className='left'>
                <h1>
                    My Friends
                </h1>
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
                        <img src={user.photoURL} alt="" />
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