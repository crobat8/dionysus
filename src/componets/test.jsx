
import React,{ useState, useEffect, useContext } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs, Firestore} from "firebase/firestore";
//import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc,onSnapshot  } from "firebase/firestore";
import my from "../img/person.png"

import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import Popup from 'reactjs-popup';
import { AuthContext } from "../context/AuthContext";

var me = {lat: 48.8584, lng: 2.2945}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
      
      me.lat=position.coords.latitude;

      me.lng=position.coords.longitude
    });
} else {
  console.log("Not Available");
}

const Test = () =>{ 
    
    const{currentUser} = useContext(AuthContext);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [loading,setLoading] =useState(true);
    const [parties,setParties] = useState([]);
    
    const colRef =collection(db,"Event")
    onSnapshot(colRef,(snapshot)=>{
        setParties(snapshot.docs.map(doc=>doc.data()))
        setLoading(false);
    })
    
    if(loading){
        return <h1>
            is loading
        </h1>
    }else{
        console.log(currentUser);
    }
    
    return (
        <div className="Parties">
            
            <div className='left'>
                <div>
                    
                </div>
            </div>
                
            
            <div className='right'>
            {parties.map((e,i)=>{
                console.log(e)
                return(
                <div>
                    <h1>
                        {e.Title}
                    </h1>
                    <p>
                       {e.Attending}
                    </p>
                    
                </div>  
                )
                })}
            </div>
            
            
        </div>
    )
}

export default Test;