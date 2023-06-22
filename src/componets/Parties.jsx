import React,{ useState, useEffect, useContext } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs} from "firebase/firestore";
//import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
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

const Parties = () =>{ 
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0',
        libraries: ['places'],
    })
    const{currentUser} = useContext(AuthContext);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [loading,setLoading] =useState(true);
    //const [rangeval, setRangeval] = useState(15);
    const [parties,setParties] = useState([]);
    //const [eventSift,setEventSift] = useState("Select Event Type");
    //const [modal,setModal] = useState(false)
    //const [logging,setLogging]=useState(true)
    //setLoading(false);
    const popupStyle = {
        color: "#e0e0e0",
        backgroundColor: "#202020",
        padding: "10px",
        fontFamily: "Arial",
        width:"200px",
        
    }
    
    const colRef =collection(db,"Event")
    onSnapshot(colRef,(snapshot)=>{
        setParties(snapshot.docs.map(doc=>doc.data()))
        setLoading(false);
    })

    function going(event,i){
        var updateKey = 'comingList.'+currentUser.uid
        console.log(parties[i])
        const partiesRef = doc(db,"Event",parties[i].id)
        updateDoc(partiesRef,{
            [updateKey]:currentUser.uid
        })
    }
    
    if(loading||!isLoaded){
        return <h1>
            is loading
        </h1>
    }else{
        //console.log(currentUser);
    }
    
    return (
        <div className="Parties">
            
                <div className='left'>
                <h2>
                    filter
                </h2>
                
                </div>
                
            
            
            <div className='right'>
                <div className="map" >
                    
                
                <GoogleMap
                    
                    center={me}
                    zoom={5}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                
                {parties.map((e,i)=>{
                    
                    var Loc = {lat: e.Lattitude, lng: e.Longitude}
                    return(
                        <MarkerF 
                            icon={
                                StyleSheet
                            }
                            position={Loc} 
                            key={i}
                            
                            label={i.toString()}
                        >
                           
                        </MarkerF>         
                    )
                })}
                
                <MarkerF 
                    icon={my}
                    position={me} 
                />

                </GoogleMap>
                </div>
                <table class="table" >
                        <thead>
                            <tr className="header">
                                <th>Number</th>
                                <th>Event Type</th>
                                <th>Title</th>
                                <th>people coming</th>
                                <th>people wanted</th>
                            </tr>
                        </thead>
                        <tbody className="rows">
                            {parties.map((e,i)=>{
                                return(
                                <Popup trigger={
                                <tr key={i} className="line">
                                    <td>{i}</td>
                                    <td>{e.EventType}</td>
                                    <td>{e.Title}</td>
                                    <td>{Object.keys(e.comingList).length}</td>
                                    <td>{e.Wanted}</td>
                                </tr> }>
                                    <div style={popupStyle} className="popup">
                                        <p>
                                            {e.Description}
                                        </p>
                                        <button onClick={(event)=> going(event,i)}>
                                            I want to go
                                        </button>
                                    </div>
                                </Popup>     
                            )
                            })}
                            
                        </tbody>
                        
                    </table>
                   
            </div>
            
            
        </div>
    )
}

export default Parties;