import React, { useContext } from "react";

import {  db  } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const LogHammer = () =>{

    const{currentUser} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        const OneReps = e.target[0].value;
        const OneDistance = e.target[1].value;
        const TwoReps = e.target[2].value;
        const TwoDistance = e.target[3].value;
        const ThreeReps = e.target[4].value;
        const ThreeDistance = e.target[5].value;
        const FourReps = e.target[6].value;
        const FourDistance = e.target[7].value;

        console.log(currentUser);
        
        
        try{
            
            let date = await new Date().getTime();
            date = date.toString();
            const day= new Date();
            let text = day.toString();
            const result = text.substring(0,15);
            const saveSpot = result +" " + currentUser.uid+" Hammer"

            await setDoc(doc(db, "workouts", saveSpot), {
                uid: currentUser.uid,
                OneReps,
                OneDistance,
                TwoReps,
                TwoDistance,
                ThreeReps,
                ThreeDistance,
                FourReps,
                FourDistance,
                date,
                day:result,
                event:"Hammer",
              });
              alert("practice succesfully logged");
        }catch(err){
            alert(err)
        }

        
    }



    return(
        <div className="Log">
            <form className="Form"onSubmit={handleSubmit}>
                <label for="OneReps" >One Turn Reps:</label>
                <input required id="OneReps" name="OneReps" type="number" />
                <label for="OneDisatnce" >One Turn Distance:</label>
                <input required id="OneDisatnce" name="OneDisatnce" type="number" step=".01"/>
                <label for="TwoReps" >Two Turn Reps:</label>
                <input required id="TwoReps" name="TwoReps" type="number" />
                <label for="TwoDistance" >Two Turn Distance:</label>
                <input required id="TwoDistance" name="TwoDistance" type="number" step=".01"/>
                <label for="ThreeReps" >Three Turn Reps:</label>
                <input required id="ThreeReps" name="ThreeReps" type="number" />
                <label for="ThreeDistance" >Three Turn Distance:</label>
                <input required id="ThreeDistance" name="ThreeDistance" type="number" step=".01"/>
                <label for="FourReps" >Four Turn Reps:</label>
                <input required id="FourReps" name="FourReps" type="number" />
                <label for="FourDistance" >Four Turn Distance:</label>
                <input required id="FourDistance" name="FourDistance" type="number" step=".01"/>
                <button>Log</button>

            </form>

        </div>

            
        
    );
}

export default LogHammer;