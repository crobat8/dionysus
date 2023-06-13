import React, { useContext } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";

const LogRotational = () =>{

    const{currentUser} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        const StandReps = e.target[0].value;
        const StandDistance = e.target[1].value;
        const WheelReps = e.target[2].value;
        const WheelDistance = e.target[3].value;
        const FullReps = e.target[4].value;
        const FullDistance = e.target[5].value;

        console.log(currentUser);
        
        
        try{
            
            let date = await new Date().getTime();
            date = date.toString();
            const day= new Date();
            let text = day.toString();
            const result = text.substring(0,15);
            const saveSpot = result +" " + currentUser.uid+ " Rotational"

            await setDoc(doc(db, "workouts", saveSpot), {
                uid: currentUser.uid,
                StandReps,
                StandDistance,
                WheelReps,
                WheelDistance,
                FullReps,
                FullDistance,
                date,
                day:result,
                event:"Rotational",
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
                <label for="WheelReps" >Wheel Throw Reps:</label>
                <input required id="WheelReps" name="WheelReps" type="number" />
                <label for="WheelDistance" >Wheel Throw Distance:</label>
                <input required id="WheelDistance" name="WheelDistance" type="number" step=".01"/>
                <label for="FullReps" >Full Throw Reps:</label>
                <input required id="FullReps" name="FullReps" type="number" />
                <label for="FullDistance" >Full Throw Distance:</label>
                <input required id="FullDistance" name="FullDistance" type="number" step=".01"/>
                <button>Log</button>

            </form>

        </div>

            
        
    );
}

export default LogRotational;