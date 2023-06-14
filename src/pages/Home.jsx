import React, { useState } from 'react';
import Navbar from '../componets/Navbar';

import Parties from '../componets/Parties';
import Create from '../componets/Create';
import Friends from '../componets/Friends';

import logo from '../img/partyuplogo.png'

//import Chat from "../componets/Chat";

const Home = () =>{ 
    
    const [page,setPage] = useState(1);
    
    function HandleSwap(){
        
        if(page === 1){
            return <Parties/>;
        }else if(page === 2){
            return <Create/>
        }else if(page === 3){
            return <Friends/>
        }else {
            return null;
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
                <div>

                </div>
                {
                    //logout button goes here
                }
                
            </header>
            <main className="page">
                <HandleSwap/>
            </main>
            <footer className="information">
                {
                    //add stuff to reach moderators here
                }
            </footer>
        </div>
    )
}

export default Home;