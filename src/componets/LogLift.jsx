import React, { useContext } from "react";

import {  db  } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const LogLift = () =>{

    const{currentUser} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        const NameOne = e.target[0].value;
        const RepsOne = e.target[1].value;
        const WeightOne = e.target[2].value;
        const NameTwo = e.target[3].value;
        const RepsTwo = e.target[4].value;
        const WeightTwo = e.target[5].value;
        
        try{
            
            let date = await new Date().getTime();
            date = date.toString();
            const day= new Date();
            let text = day.toString();
            const result = text.substring(0,15);
            const saveSpot = result +" " + currentUser.uid+" Lift"

            await setDoc(doc(db, "workouts", saveSpot), {
                uid: currentUser.uid,
                NameOne,
                RepsOne,
                WeightOne,
                NameTwo,
                RepsTwo,
                WeightTwo,
                date,
                day:result,
                event:"Lift",
              });
              alert("practice succesfully logged");
        }catch(err){
            alert(err)
        }
    }



    return(
        <div className="Log">
            <form className="Form"onSubmit={handleSubmit}>
                
                <label for="NameOne" >Name of First Lift:</label>
                <input required id="NameOne" name="NameOne" type="text" />
                <label for="RepsOne" >Reps on First Lift:</label>
                <input required id="RepsTwo" name="RepsTwo" type="number"/>
                <label for="WeightOne" >Weight on First Lift:</label>
                <input required id="WeightOne" name="WeightOne" type="number" />

                <label for="NameTwo" >Name of Second Lift:</label>
                <input required id="NameTwo" name="NameTwo" type="text" />
                <label for="RepsTwo" >Reps on Second Lift:</label>
                <input required id="RepsTwo" name="RepsTwo" type="number"/>
                <label for="WeightTwo" >Weight on Second Lift:</label>
                <input required id="WeightTwo" name="WeightTwo" type="number" />

                <button>Log</button>
            </form>
        </div>

            
        
    );
}

export default LogLift;