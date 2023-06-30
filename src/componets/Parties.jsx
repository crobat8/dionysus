import React,{
   useState,
   useContext 
} from "react";

import {  
  db
} from "../firebase";

import {
  query,
  where, 
} from "firebase/firestore";

import { 
  collection,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

import my from "../img/person.png"

import { 
  GoogleMap, 
  useJsApiLoader, 
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";

import { 
  AuthContext 
} from "../context/AuthContext";

import PartyChat from "./PartyChat";

var me = {lat: 48.8584, lng: 2.2945}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    me.lat=position.coords.latitude;
    me.lng=position.coords.longitude
  });
} else {
}

const Parties = () =>{ 
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0',
    libraries: ['places'],
  })
  const{currentUser} = useContext(AuthContext);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [loading,setLoading] =useState(true);
  const [loading2,setLoading2] =useState(true);
  const [loading3,setLoading3] =useState(true);
  const [loading4,setLoading4] =useState(false);
  const [parties,setParties] = useState([]);
  const [choseSlide,setChoseSlide] =useState(0);
  const [myData,setMyData]     = useState([]);
  const [friends,setFriends]   = useState([]);
  const [milesSlider,setmilesSlider] =useState(10);
  const [genreFilter,setGenreFilter] =useState(["Sports","House Party","Yard Games","Hit The Town","Video Games","Board Games"]);
  
  function arrayRemove(genre,value){
    return genre != value
  }

  function handleGenre(input){
    var value = input.target.value
    if(input.target.checked){
      setGenreFilter([...genreFilter,value])
    }else{
      const index = genreFilter.indexOf(value);
      const holderArray = genreFilter
      if(index>-1){
        holderArray.splice(index,1)
      }
      setGenreFilter(holderArray);

    }

    getParties();
    
  }

  function handleRange(input){
    setmilesSlider(input )
  }

  function handleDropDown(x){
    setChoseSlide(x.i);
  }
  
  function IdCrossover(array1,array2){
    var retArray = [];
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          retArray.push(array1[i]);
        }
      }
    }
    return retArray;
  }

  function getParties(){
    const colRef =collection(db,"Event")
    onSnapshot(colRef,(snapshot)=>{
      setParties(snapshot.docs.map(doc=>doc.data()))
      setLoading(false);
    })
  }
  
  function convertIdToName(Crossed){
    var retArray= [];
    for (let i = 0; i <Crossed.length; i++) {
      for (let j = 0; j < friends.length; j++) {
        if (Crossed[i] === friends[j].uid) {
          retArray.push(friends[j].displayName);
        }
      }
    }
    return retArray;
  }

  function getMe(){
    const meRef = query(collection(db,"users")
                  ,where("uid","==",currentUser.uid))
    onSnapshot(meRef,(snapshot)=>{
      setMyData(snapshot.docs.map(doc=>doc.data()))
      setLoading2(false)
    })

    if(loading2){

    }else{
    const friendIds = Object.values(myData[0].friends)
    const friendsRef = query(collection(db,"users")
                      ,where("uid","in",friendIds))
    onSnapshot(friendsRef,(snapshot)=>{
      setFriends(snapshot.docs.map(doc=>doc.data()))
      setLoading3(false)
    })
    }
  }

  function going(event,i){
    var updateKey = 'comingList.'+currentUser.uid
    const partiesRef = doc(db,"Event",parties[i-1].id)
    updateDoc(partiesRef,{
      [updateKey]:currentUser.uid
    })
    alert("added you to the going list")
  }
  
  function DropDown (props){
    var event = props.information;
    var i = props.number
    var coming = props.coming
    if(choseSlide === i){
      return(
        <div  className="slideDown" style={{overflow:"hide"}} >
          <div className="partyInfo">
            <div>
              <h3>
                Description: 
              </h3>
              <p>
                {event.Description}
              </p>
            </div>
            <div className="peopleComing">
              <h3>
                friends coming:
              </h3>
              {coming.map((e)=>{ 
                return(
                  <div  className="Person" >
                    {e}
                              
                  </div>
                )
              })}
            </div>
            <button onClick={(event)=> going(event,i)}>
              GOING
            </button>
          </div>
          <div className="partyChat">
            <PartyChat event={event}/>
          </div>
        </div>
      )
    }
  }


  

  if(loading||!isLoaded||loading2||loading3){
    getParties();
    getMe();
    return <h1>
      Loading
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
        {/* <div className="range">
          <input 
            id="distance"
            className="distance" 
            type="range" 
            min="1" 
            max="50" 
            onChange={(event)=>handleRange(event.target.value)}
            step="1"
            defaultValue={10}
          />
          <p>
            search range: {milesSlider} miles
          </p> 
        </div> */}
        
        <div className="events">
        
          <h3>
            Event Types:
          </h3>
          <form >
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Sports"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              <label
                className="form-check-label"
              >
                Sports
              </label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="House Party"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              <label
                className="form-check-label"
              >
                House Party
              </label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Yard Games"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              <label
                className="form-check-label"
              >
                Yard Games
              </label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Hit The Town"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              <label
                className="form-check-label"
              >
                Hit The Town
              </label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Video Games"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              <label
                className="form-check-label"
              >
                Video Games
              </label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Board Games"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              <label
                className="form-check-label"
              >
                Board Games
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className='right'>
        <div className="map" >
          <GoogleMap 
            center={me}
            zoom={10}
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
              i=i+1;
              var Loc = {lat: e.Lattitude, lng: e.Longitude}
              var close = 0
              if(genreFilter.includes(e.EventType)){
                if(i == choseSlide){
                  return(
                    <MarkerF 
                    icon={
                      StyleSheet
                    }
                    position={Loc} 
                    key={i}
                    zIndex={75}
                    onClick={() => handleDropDown({i})}
                    label={i.toString()}
                    >
                      <InfoWindowF
                        position={Loc} 
                        key={i}
                        onCloseClick={(close) => handleDropDown({close})}
                      >
                        <span>
                          {e.Address}
                        </span>
                      </InfoWindowF>
                    </MarkerF>     
                  )
                }else{
                  return(
                    <MarkerF 
                    icon={
                      StyleSheet
                    }
                    position={Loc} 
                    key={i}
                    zIndex={i}
                    onClick={() => handleDropDown({i})}
                    label={i.toString()}
                    >
                    </MarkerF>            
                  )
                }
              }
            })}
            <MarkerF 
              icon={my}
              position={me} 
              zIndex={50}
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
              //used to find crossover between friends and who is coming to the party
              var friendIds =Object.values(myData[0].friends)
              var comingIds =Object.values(e.comingList)
              var crossOver = IdCrossover(friendIds,comingIds);
              var disNames = convertIdToName(crossOver)
              i=i+1
              if(genreFilter.includes(e.EventType)){
                if(i === choseSlide){
                  return(
                    <div  className="FullParty" style={{backgroundColor:"#00618c"}}>
                      <tr key={i} className="line" onClick={() => handleDropDown({i})}>
                        <td>{i}</td>
                        <td>{e.EventType}</td>
                        <td>{e.Title}</td>
                        <td>{Object.keys(e.comingList).length}</td>
                        <td>{e.Wanted}</td>
                      </tr> 
                      <DropDown information={e} number={i} coming={disNames}>
                      </DropDown> 
                    </div>
                  )
                }else{
                  return(
                    <div  className="FullParty" >
                      <tr key={i} className="line" onClick={() => handleDropDown({i})}>
                        <td>{i}</td>
                        <td>{e.EventType}</td>
                        <td>{e.Title}</td>
                        <td>{Object.keys(e.comingList).length}</td>
                        <td>{e.Wanted}</td>
                      </tr> 
                    </div>
                  )
                }
              }
              
            })}
              
          </tbody>
                
        </table> 
                
      </div>  
    </div>
  )
}
export default Parties;