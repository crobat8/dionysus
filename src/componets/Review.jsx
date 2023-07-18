import React,{useState,useRef,useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import {  db  } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const Review = () =>{
  const{currentUser} = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    const email = e.target[0].value;
    const review = e.target[1].value;

    let date = await new Date().getTime();
    console.log(date)
    
    try{
      setDoc(doc(db, "Event", date+currentUser.uid), {
        
        date,
        email,
        review,
        sentBy:currentUser.uid
        
      });
      
      alert("review was succesfully sent thank you")
      
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='Review'>
      <form className="Form" onSubmit={handleSubmit}>
        <h1>Send Us A Review</h1>
        <label for="email" >Email:</label>
        <input required type="email" placeholder="email" />
        <label for="review" >Description:</label>
        <textarea rows="5" width="100%" id="review" name="review" placeholder="Enter text"/>        
        {/* <label for="reach" >Do You Mind If We Contact You:</label>
        <input type="checkbox"  /> */}
        <button>send</button>
      </form>
    </div>
  );
}
export default  Review;