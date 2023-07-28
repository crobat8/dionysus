import React from "react";

const Pill = (props) =>{
  if(props.count%2==0){
    
    return(
      <article className="pill">

        <div className="text">
          <h2>
            {props.data.title}
          </h2>
          <p>
            {props.data.description}
          </p>
        </div>
        <div className="picture">
          <img src={props.data.pic} alt=""/>
        </div>
      </article>
    )
  }else{
    return(
      <article className="pill">
        <div className="picture">
          <img src={props.data.pic} alt=""/>
        </div>
        <div className="text">
          <h2>
            {props.data.title}
          </h2>
          <p>
            {props.data.description}
          </p>
        </div>
      </article>
    )
  }

}
export default Pill;