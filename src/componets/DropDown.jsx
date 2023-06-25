import React from "react";

const DropDown =  (props)=>{
    var event = props.information;
    var i = props.number
    var coming = props.coming
    if(true){
        return(
            <div  className="slideDown" style={{overflow:"hide"}} >
                <p>
                    {event.Description}
                </p>
                
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
                

            </div>
        )
    }
}
export default DropDown