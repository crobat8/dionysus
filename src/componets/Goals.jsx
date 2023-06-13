import React, { useContext, useState } from "react";

import {  db  } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import RadioButton from "./RadioButton";
const Goals = () =>{

    const{currentUser} = useContext(AuthContext);

    // const[eventState,setEventState] = useState("Disc");
    const [goalEvent, setGoalEvent] = useState("COD");

    const radioChangeHandler = (e) => {
        setGoalEvent(e.target.value);
    };
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        const Distance = e.target[4].value;
        
        try{

            await updateDoc(doc(db, "Goals", currentUser.uid), {
                uid: currentUser.uid,
                [goalEvent]:Distance,
                
              });
              alert("Goal succesfully logged");
        }catch(err){
            alert(err)
        }
    }

    return(
        <div className="Log">
            <form className="Form"onSubmit={handleSubmit}>
            
                <div className="radio-btn-container" style={{ display: "flex" }}>
                    <RadioButton
                    changed={radioChangeHandler}
                    id="1"
                    isSelected={goalEvent === "Disc"}
                    label="Disc"
                    value="Disc"
                    />

                    <RadioButton
                    changed={radioChangeHandler}
                    id="2"
                    isSelected={goalEvent === "Glide"}
                    label="Glide"
                    value="Glide"
                    />

                    <RadioButton
                    changed={radioChangeHandler}
                    id="3"
                    isSelected={goalEvent === "Rotational"}
                    label="Rotational"
                    value="Rotational"
                    />

                    <RadioButton
                    changed={radioChangeHandler}
                    id="4"
                    isSelected={goalEvent === "Hammer"}
                    label="Hammer"
                    value="Hammer"
                    />
                </div>
                <label for="Distance" >Goal Distance To Throw:</label>
                <input required id="Distance" name="Distance" type="number" step=".01"/>

                <button>Submit</button>
            </form>
        </div>

            
        
    );
}

export default Goals;