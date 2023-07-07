import React, { useContext, useState } from 'react';


import Parties from '../componets/Parties';
import Create from '../componets/Create';
import Friends from '../componets/Friends';


import logo from '../img/partyuplogo.png'
import { auth } from '../firebase'
import {signOut} from "firebase/auth"
import { AuthContext } from '../context/AuthContext';

//import Chat from "../componets/Chat";

const Home = () =>{ 
    
    const [page,setPage] = useState(0);
    const{currentUser} = useContext(AuthContext);
    function HandleSwap(){
        
        if(page === 1){
            return <Parties/>;
        }else if(page === 2){
            return <Create/>
        }else if(page === 3){
            return <Friends/>
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
    
    return (
        <div className="home">
            <header className="topBar">
                
                <img src={logo} alt='logo'/>
                

                <ul className="selectors">
                    <button onClick={()=>setPage(1)}>
                        Parties
                    </button>
                    <button onClick={()=>setPage(2)}>
                        Create
                    </button>
                    <button onClick={()=>setPage(3)}>
                        Friends
                    </button>
                    
                </ul>
                <div className='logout'>
                    <h4>
                        name:{currentUser.displayName}
                    </h4>
                    <button onClick={()=>signOut(auth)}>logout</button>
                    
                </div>
                
                
            </header>
            <main className="page">
                <HandleSwap/>
            </main>
            <footer className="information">
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
                        <span>
                            partyupcontact@gmail.com
                        </span>
                    </div>
                    <div className='right'>
                        <h3>
                            Other
                        </h3>
                        <span>
                            partyupcontact@gmail.com
                        </span>
                    </div>
                </div>
                <div className='infoBot'>
                    <span className='copy'>
                        &copy; PartyUp
                    </span>
                    
                </div>
                
                
            </footer>
        </div>
    )
}

export default Home;