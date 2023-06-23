import React,{useState,useRef,useContext} from 'react'

import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import {  db  } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import Geocode from "react-geocode";

  //default location aka paris
  var center = {lat: 48.8584, lng: 2.2945}

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        
        center.lat=position.coords.latitude;

        center.lng=position.coords.longitude
      });
  } else {
    console.log("Not Available");
  }



const Create = () =>{ 

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0',
        libraries: ['places'],
      })
      const [screen,setScreen] =useState(window.innerWidth/4)
      const [map, setMap] = useState(/** @type google.maps.Map */ (null))
      const [directionsResponse, setDirectionsResponse] = useState(null)
      const [distance, setDistance] = useState('')
      const [duration, setDuration] = useState('')

      const [partyLocation,setPartyLocation] = useState(center);
      const [submitLoading,setSubmitLoading] = useState(false);
      Geocode.setApiKey("AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0");
      
      //const handleChange = (event) => setPartyL(event.target.value);

      const{currentUser} = useContext(AuthContext);
    
      /** @type React.MutableRefObject<HTMLInputElement> */
      const originRef = useRef()
      /** @type React.MutableRefObject<HTMLInputElement> */
      const destiantionRef = useRef()
    
      if (!isLoaded) {
        return <h1>
            map is loading
        </h1>
      }
    
      async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
          return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destiantionRef.current.value,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)

        Geocode.fromAddress(destiantionRef.current.value).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              center.lat = lat;
              center.lng = lng;
              
            },
            (error) => {
              console.error(error);
            }
        );
        setPartyLocation(center)
      }
    
      
      function handleLocation(){
        console.log(destiantionRef.current.value);
        Geocode.fromAddress(destiantionRef.current.value).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            center.lat = lat;
            center.lng = lng;
            setPartyLocation(center)
          },
          (error) => {
            console.error(error);
          }
      );
        
      }

      const handleSubmit = async (e) => {
        
        const EventType = e.target[1].value;
        const Title = e.target[2].value;
        const Description = e.target[3].value;
        const Wanted = e.target[4].value;
        const Location = partyLocation;
        console.log(Location)
        try{
            
            await setDoc(doc(db, "Event", currentUser.uid), {
                comingList:{
                  [currentUser.uid]:currentUser.uid
                },
                id:currentUser.uid,
                EventType,
                Title,
                Description,
                Wanted,
                Lattitude:center.lat,
                Longitude:center.lng,
                Location,
                
              });
              alert("event was succesfully added");
        }catch(err){
            alert(err)
        }

        
    }


      return (
        <div className='create'>
            <Flex
          
                flexDirection='column'
                alignItems='center'
                h='700px'
                w='100vw'
            >
            
            <Box mt={20} left={screen} top={100} h='600px' w='80%'>
            
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
                  
                <Marker position={center} />
                
                </GoogleMap>
            </Box>
            </Flex>
            <form className="Form" onSubmit={handleSubmit}>
            <label for="goingTo" >Where:</label>
              <Autocomplete onPlaceChanged={handleLocation}>
                  <Input
                    className='goingTo'
                    type='text'
                    placeholder='where is the hangout going to be'
                    ref={destiantionRef}
                    width='250px'
                    required
                  />
                </Autocomplete>
                <label for="Event" >
                    Event Type:
                    <select required id='EventType' name="EventType">
                        <option value="BasketBall">BasketBall</option>
                        <option value="House Party">House Party</option>
                        <option value="Corn Hole">Corn Hole</option>
                    </select>
                </label>
                <label for="Title" >Title:</label>
                <input required id="Title" name="Title"/>
                <label for="Description" >Description:</label>
                <textarea rows="5" width="100%" id="Description" name="Description" placeholder="Enter text"/>
                <label for="attendingWanted" >
                    How many people do you have coming so far:
                </label>
                <input className='attendingWanted' id='attendingWanted' type='number'></input>

                <button>Log</button>

            </form>
        </div>
        


      )

}

export default Create;