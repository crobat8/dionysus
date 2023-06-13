import React, { useState } from 'react';

import Log from '../componets/Log';
import Graphs from '../componets/Graphs';
import Workouts from '../componets/Workouts';

import Navbar from '../componets/Navbar';
import Goals from '../componets/Goals';


//import Chat from "../componets/Chat";

const Home = () =>{ 
    
    const [count,setCount] = useState(1);
    
    function HandleSwap(){
        
        if(count === 1){
            return <Log/>;
        }else if(count === 2){
            return <Graphs/>
        }else if(count === 3){
            return <Workouts/>
        }else if(count === 4){
            return <Goals/>
        }else {
            return null;
        }

    }
    
    return (
        <div className="home">
            <div className="container">
                <div >
                    <div className="sidebar">
                        <Navbar/>  
                        <button onClick={()=>setCount(1)}>
                            Log
                        </button>
                        <button onClick={()=>setCount(2)}>
                            Graph
                        </button>
                        {
                        //<button onClick={()=>setCount(3)}>}
                            //Workout
                        //</button>
                        }
                        <button onClick={()=>setCount(4)}>
                            Goals
                        </button>
                    </div>
                </div>
                <HandleSwap/>
            </div>
        </div>
    )
}

export default Home;