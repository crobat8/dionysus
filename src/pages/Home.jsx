import React, { useContext, useState,memo } from 'react';


import Parties from '../componets/Parties';
import Create from '../componets/Create';
import Friends from '../componets/Friends';
import Settings from '../componets/Settings';

import logo from '../img/partyuplogo.png'
import { auth } from '../firebase'
import {signOut} from "firebase/auth"
import { AuthContext } from '../context/AuthContext';
import { 
    AiFillGithub,
    AiFillLinkedin,
    AiFillFacebook,
    AiFillInstagram 
} from 'react-icons/ai';
import Review from '../componets/Review';

const Home = () =>{ 
    
    const [page,setPage] = useState(0);
    const{currentUser} = useContext(AuthContext);

    let iconStyles = { color: "#e2f1ff", fontSize: "1.5em" ,padding:"5px"};
    
    

    function review(){
        alert("we are still working on implementing this")
    }

    function HandleSwap(){
        
        if(page === 1){
            return <Parties/>;
        }else if(page === 2){
            return <Create/>
        }else if(page === 3){
            return <Friends/>
        }else if(page === 4){
            return <Settings/>
        }else if(page === 5){
            return <Review/>
        }else {
            return (
            <div style={{"min-height": "1000px","textAlign":"center"}}>
                <h1 style={{"backgroundColor":"#00b2be",
                            "textAlign":"center",
                            "padding":"20px",
                            "borderRadius":"20px"}}>
                    select a page to go to
                </h1>
            </div>
            )
        }

    }
    
    const disableButtonHandler = (x)=>{
        alert(x)
    }

    return (
        <div className="home" >
            <header className="topBar" >
                
                <img src={logo} alt='logo' onClick={()=>setPage(1)} />
                

                <ul className="selectors"  >
                    <button onClick={()=>setPage(1)}>
                        Parties
                    </button>
                    {currentUser.uid == "BqJmqRQc2gQnSoHZVwoH8Q99uya2"
                    ?
                    <button onClick={()=>disableButtonHandler("Create is diabled on guest account ")}>
                        Create
                    </button>
                    :
                    <button onClick={()=>setPage(2)}>
                        Create
                    </button>
                    }
                    
                    {currentUser.uid == "BqJmqRQc2gQnSoHZVwoH8Q99uya2"
                    ?
                    <button onClick={()=>disableButtonHandler("Friends are diabled on guest account ")}>
                        Friends
                    </button>
                    :
                    <button onClick={()=>setPage(3)}>
                        Friends
                    </button>
                    }
                    
                </ul>
                <div className='user' onClick={()=>setPage(4)}>
                    <img src={currentUser.photoURL} alt="" width={"100%"}/>
                    
                    <button onClick={()=>signOut(auth)}className='logout'>logout</button>
                    <h4>
                        name:{currentUser.displayName}
                    </h4>
                </div>
                
                
            </header>
            <main className="page" >
                <HandleSwap/>
            </main>
            <footer className="information" >
                <div className='infoTop'>
                    <div className='left'>
                        <h3>
                            contact info
                        </h3>
                        <span>
                            partyupcontact@gmail.com
                        </span>
                    </div>
                    <div className='middle'>
                        <h3>
                            social media
                        </h3>
                        <div>
                            <a href="https://www.facebook.com/profile.php?id=100094597923715">
                                <AiFillFacebook style={iconStyles}/>
                            </a>
                            <a href="https://www.instagram.com/partyup.social/">
                                <AiFillInstagram style={iconStyles}/>
                            </a>
                        </div>
                        

                    </div>
                    <div className='right'>
                        <h3>
                            Other
                        </h3>
                        <button  onClick={()=>setPage(5)}>
                            send us a review
                        </button>
                    </div>
                </div>
                <div className='infoBot' >
                    <span className='copy'>
                        &copy; PartyUp
                    </span>                 
                </div>
            </footer>
        </div>
    )
}

export default Home;