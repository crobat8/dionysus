import React from "react";

import Graph from "./Graph";


const Graphs = () =>{

    /*const DiscProps = {
        event :"Disc",
        throwOne:"StandDisatance",
        throwTwo:"WheelDistance",
        throwThree:"FullDistance",
    }*/

    return(
        <div className="graphView">
            <h1>Graphs page:</h1>
            <Graph 
            event ="Disc"
            throwOne="StandDistance"
            throwTwo="WheelDistance"
            throwThree="FullDistance"
            />
            <Graph 
                event ="Glide" 
                throwOne="StandDistance" 
                throwTwo="StepbackDistance" 
                throwThree="FullDistance"
            />
            <Graph 
                event ="Rotational"
                throwOne="StandDistance" 
                throwTwo="WheelDistance" 
                throwThree="FullDistance"
            />
            <Graph 
                event ="Hammer"
                throwOne="TwoDistance" 
                throwTwo="ThreeDistance" 
                throwThree="FourDistance"
            />
        </div>
    );
}

export default Graphs;