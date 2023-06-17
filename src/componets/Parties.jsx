import React,{ useState,useContext, useEffect } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";


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
                {parties.map((e)=>{
                    console.log(e)
                    var center = {lat: e.data.Lattitude, lng: e.data.Longitude}
                    //const personIcon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png";
                    return(
                        <article className="party" >
                            <h2>
                                {e.data.Title}
                            </h2>
                            <h3>
                                {e.data.EventType}
                            </h3>
                            <div style={{ "height" : "70%" , "width" : "100%"}}>
                                <GoogleMap
                                    center={center}
                                    zoom={15}
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    options={{
                                        zoomControl: false,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false,
                                    }}
                                    onLoad={map => setMap(map)}
                                >
                                    <MarkerF 
                                    position={center} 
                                    />
                                    <MarkerF 
                                    position={me} 
                                    />

                                </GoogleMap> 
                            </div>
                            <p>
                                currently have: {e.data.Attending}
                            </p>
                            <p>
                                looking to have have: {e.data.Wanted}
                            </p>
                        </article>
                        
                        
                    )
                })}
            </div>
        </div>
    )
}

export default Parties;