import React from "react";
import Sidebar from "../componets/Sidebar";
import Chat from "../componets/Chat";

const Home = () =>{
    return (
        <div className="home">
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Home;