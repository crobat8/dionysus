import React, { useContext } from "react";

import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";

const LogGlide = () =>{

    const{currentUser} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        

        const StandReps = e.target[0].value;
        const StandDistance = e.target[1].value;
        const StepbackReps = e.target[2].value;
        const StepbackDistance = e.target[3].value;
        const FullReps = e.target[4].value;
        const FullDistance = e.target[5].value;

        console.log(currentUser);
        
        
        try{
            
            let date = await new Date().getTime();
            date = date.toString();
            const day= new Date();
            let text = day.toString();
            const result = text.substring(0,15);
            const saveSpot = result +" " + currentUser.uid + " Glide"

            await setDoc(doc(db, "workouts", saveSpot), {
                uid: currentUser.uid,
                StandReps,
                StandDistance,
                StepbackReps,
                StepbackDistance,
                FullReps,
                FullDistance,
                date,
                day:result,
                event:"Glide",
              });
              alert("practice succesfully logged");
        }catch(err){
            alert(err)
        }

        
    }



    return(
        <div className="Log">
            <form className="Form"onSubmit={handleSubmit}>
                <label for="StandReps" >Stand Throw Reps:</label>
                <input required id="StandReps" name="StandReps" type="number" />
                <label for="StandDisatnce" >Stand Throw Distance:</label>
                <input required id="StandDisatnce" name="StandDisatnce" type="number" step=".01"/>
                <label for="StepbackReps" >Stepback Throw Reps:</label>
                <input required id="StepbackReps" name="StepbackReps" type="number" />
                <label for="StepbackDistance" >Stepback Throw Distance:</label>
                <input required id="StepbackDistance" name="StepbackDistance" type="number" step=".01"/>
                <label for="FullReps" >Full Throw Reps:</label>
                <input required id="FullReps" name="FullReps" type="number" />
                <label for="FullDistance" >Full Throw Distance:</label>
                <input required id="FullDistance" name="FullDistance" type="number" step=".01"/>
                <button>Log</button>

            </form>

        </div>

            
        
    );
}

export default LogGlide;