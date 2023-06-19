import React,{ useState,useContext, useEffect } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import my from "../img/person.png"

import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import Popup from 'reactjs-popup';

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
    const [rangeval, setRangeval] = useState(15);
    const [parties,setParties] = useState([]);
    const [eventSift,setEventSift] = useState("Select Event Type");
    const [modal,setModal] = useState(false)
    const [logging,setLogging]=useState(true)
    //setLoading(false);
    const popupStyle = {
        color: "#e0e0e0",
        backgroundColor: "#202020",
        padding: "10px",
        fontFamily: "Arial",
        width:"200px",
        
    }
    
    function getParties(){
        
        const partiesCollectionRef = collection(db,"Event")
        const sifted =query(partiesCollectionRef
                      ,where("Lattitude",">",0));
        getDocs(sifted)
        .then(response =>{
            const party = response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            setParties(party)
            setLoading(false)
        })
        .catch(error => console.error(error.message))  
        
        
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function going(event,i){
        console.log(parties[i]);
        console.log(parties[i].data);
        console.log(parties[i].data.Attending);
        parties[i].data.Attending++;
        //var increase = (1+(Number()))
        const partiesRef = doc(db,"Event",parties[i].id)
        updateDoc(partiesRef,{
            Attending:parties[i].data.Attending
        });
        
        
        for(var x=0;x<1000;x++){

        }
        //window.location.reload();
        
    }

    useEffect(() => {
        getParties();
    },[])
    
    if(loading||!isLoaded){
        return <h1>
            is loading
        </h1>
    }else{
        //console.log(parties);
    }
    
    return (
        <div className="Parties">
            {
                /*
                <div className='left'>
                <h2>
                    filter
                </h2>
                
                </div>
                */
            }
            
            
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
                    
                    var Loc = {lat: e.data.Lattitude, lng: e.data.Longitude}
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
                                    <td>{e.data.EventType}</td>
                                    <td>{e.data.Title}</td>
                                    <td>{e.data.Attending}</td>
                                    <td>{e.data.Wanted}</td>
                                </tr> }>
                                    <div style={popupStyle} className="popup">
                                        <p>
                                            {e.data.Description}
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