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
      Geocode.setApiKey("AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0");
      Geocode.fromLatLng(center.lat, center.lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setPartyLocation(address);
        },
        (error) => {
          console.error(error);
        }
      );
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
        setPartyLocation(destiantionRef.current.value)
        
        console.log(partyLocation);
      }
    
      function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
      }
      
      const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        console.log(e)

        const EventType = e.target[0].value;
        const Title = e.target[1].value;
        const Description = e.target[2].value;
        const Attending = e.target[3].value;
        const Wanted = e.target[4].value;
        const Location = partyLocation;


        
        
        try{
            
            await setDoc(doc(db, "Event", currentUser.uid), {
                uid: currentUser.uid,
                EventType,
                Title,
                Description,
                Attending,
                Wanted,
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
                {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
                )}
                </GoogleMap>
            </Box>
          <Box
            p={4}
            borderRadius='lg'
            m={4}
            bgColor='white'
            shadow='base'
            minW='container.md'
            zIndex='1'
          >
            <HStack spacing={2} justifyContent='space-between'>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input 
                  className='comingFrom'
                  type='text' 
                  placeholder='where are you coming from' 
                  ref={originRef}
                  width='250px'
                  
                  />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input
                    className='goingTo'
                    type='text'
                    placeholder='where is the hangout going to be'
                    ref={destiantionRef}
                    width='250px'
                  />
                </Autocomplete>
              </Box>
    
              <ButtonGroup>
                <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                  Calculate Route
                </Button>
                <IconButton
                  aria-label='center back'
                  icon={<FaTimes />}
                  onClick={clearRoute}
                />
              </ButtonGroup>
            </HStack>
            <HStack spacing={4} mt={4} justifyContent='space-between'>
              <Text>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
              <IconButton
                aria-label='center back'
                icon={<FaLocationArrow />}
                isRound
                onClick={() => {
                  map.panTo(center)
                  map.setZoom(15)
                }}
              />
            </HStack>
          </Box>
          
            </Flex>
            <form className="Form" onSubmit={handleSubmit}>
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
                <textarea rows="5" cols="40" id="Description" name="Description" placeholder="Enter text"/>
                <label for="attendingCount" >
                    How many people do you have coming so far:
                    <select required id='attendingCount' name="attendingCount">
                        <option value="0">0</option>
                        <option value="1" selected="selected">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="6+">6+</option>

                    </select>
                </label>
                <label for="attendingWanted" >
                    How many people do you have coming so far:
                    <select required id='attendingWanted' name="attendingWanted">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="6+" selected="selected">6+</option>

                    </select>
                </label>
                <button>Log</button>

            </form>
        </div>
        


      )

}

export default Create;