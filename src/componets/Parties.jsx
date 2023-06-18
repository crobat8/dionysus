import React,{ useState,useContext, useEffect } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

import my from "../img/person.png"

import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

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

    const [parties,setParties] = useState([]);

    //setLoading(false);
    
    
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
    


    useEffect(() => {
        getParties();
    },[])
    
    if(loading||!isLoaded){
        return <h1>
            is loading
        </h1>
    }else{
        console.log(parties);
    }
    
    return (
        <div className="Parties">
            <div className='left'>
                <h2>
                    filter
                </h2>
                <ul className='filter'>
                    
                </ul>
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
                    
                    var Loc = {lat: e.data.Lattitude, lng: e.data.Longitude}
                    return(
                        <MarkerF 

                            position={Loc} 
                            key={i}
                        />         
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
                                <th>Event Type</th>
                                <th>Title</th>
                                <th>people coming</th>
                                <th>people wanted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parties.map((e,i)=>{
                                console.log(e)
                
                                console.log(i)
                                return(
                                <tr key={i} className="line">
                                    <td>{e.data.EventType}</td>
                                    <td>{e.data.Title}</td>
                                    <td>{e.data.Attending}</td>
                                    <td>{e.data.Wanted}</td>
                                </tr>        
                            )
                            })}
                            
                        </tbody>
                        
                    </table>
                   
            </div>
        </div>
    )
}

export default Parties;