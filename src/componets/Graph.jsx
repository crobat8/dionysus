import React,{ useState,useContext, useEffect } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



const Graph = (props) =>{

    const{currentUser} = useContext(AuthContext);

    const[loading1,setLoading1] = useState(true);

    const[loading2,setLoading2] = useState(true);

    const[loading3,setLoading3] = useState(true);

    const[workouts,setWorkouts] = useState([]);

    const[lifts,setLifts]=useState([]);

    const[goal,setGoal]=useState();
    
    function getWorkouts(){
        const workoutCollenctionRef =collection(db,"workouts")
        const siftedW = query(workoutCollenctionRef
            ,where("uid","==",currentUser.uid)
            ,where("event" ,"==",props.event)
            ,orderBy("date"));
        getDocs(siftedW)
        .then(response =>{
            
            const work =  response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            setWorkouts(work)
            setLoading1(false);
        }
        )
        .catch(error => console.error(error.message))

        const siftedL = query(workoutCollenctionRef
            ,where("uid","==",currentUser.uid)
            ,where("event" ,"==","Lift")
            ,orderBy("date"));
        getDocs(siftedL).then(response =>{
            
            const Lift =  response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            setLifts(Lift)
            setLoading2(false);
        }
        )
        .catch(error => console.error(error.message))

        const GoalCollenctionRef =collection(db,"Goals")
        const siftedG = query(GoalCollenctionRef
            ,where("uid","==",currentUser.uid));
        getDocs(siftedG).then(response =>{
            
            const Goal =  response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            setGoal(Goal)
            setLoading3(false);
        }
        )
        .catch(error => console.error(error.message))
    }
    

    function Display(){


        let gatheredInfoOne   = [];
        let gatheredInfoTwo   = [];
        let gatheredInfoThree = [];
        
        let gatheredDates     = [];
        
        let gatheredNameOne   = [];
        let gatheredRepsOne   = [];
        let gatheredLiftsOne  = [];
        let gatheredNameTwo   = [];
        let gatheredRepsTwo  = [];
        let gatheredLiftsTwo  = [];

        let gatheredGoals = []; 

        var combinedDay = 0;
        var W = 0;
        var L = 0;

        gatheredGoals[0] = goal[0].data[props.event];
        
        while(W<workouts.length&&L<lifts.length){
            if(workouts[W].data.day === lifts[L].data.day){
                gatheredInfoOne[combinedDay] = workouts[W].data[props.throwOne];
                gatheredInfoTwo[combinedDay] = workouts[W].data[props.throwTwo];
                gatheredInfoThree[combinedDay] = workouts[W].data[props.throwThree];
                
                gatheredLiftsOne[combinedDay] = lifts[L].data.WeightOne;
                gatheredLiftsTwo[combinedDay] = lifts[L].data.WeightTwo;
                gatheredRepsOne[combinedDay]  = lifts[L].data.RepsOne;
                gatheredRepsTwo[combinedDay]  = lifts[L].data.RepsTwo;
                gatheredNameOne[combinedDay]  = lifts[L].data.NameOne;
                gatheredNameTwo[combinedDay]  = lifts[L].data.NameTwo;

                gatheredDates[combinedDay] = workouts[W].data.day;
                
                
                L = L+1;
                W = W+1;
                combinedDay++;
            }else if(workouts[W].data.date > lifts[L].data.date){
                gatheredLiftsOne[combinedDay] = lifts[L].data.WeightOne;
                gatheredLiftsTwo[combinedDay] = lifts[L].data.WeightTwo;
                gatheredDates[combinedDay] = lifts[L].data.day;

                gatheredLiftsOne[combinedDay] = lifts[L].data.WeightOne;
                gatheredLiftsTwo[combinedDay] = lifts[L].data.WeightTwo;
                gatheredRepsOne[combinedDay]  = lifts[L].data.RepsOne;
                gatheredRepsTwo[combinedDay]  = lifts[L].data.RepsTwo;
                gatheredNameOne[combinedDay]  = lifts[L].data.NameOne;
                gatheredNameTwo[combinedDay]  = lifts[L].data.NameTwo;

                L = L+1;
                combinedDay++;
            }else if(workouts[combinedDay].data.date < lifts[L].data.date){
                gatheredInfoOne[combinedDay] = workouts[W].data[props.throwOne];
                gatheredInfoTwo[combinedDay] = workouts[W].data[props.throwTwo];
                gatheredInfoThree[combinedDay] = workouts[W].data[props.throwThree];
                gatheredDates[combinedDay] = workouts[W].data.day;
                W = W+1;
                combinedDay++;
            }else{
                console.log("this should never be scene");
            }

        }
        while(W<workouts.length){
            gatheredInfoOne[combinedDay] = workouts[W].data[props.throwOne];
            gatheredInfoTwo[combinedDay] = workouts[W].data[props.throwTwo];
            gatheredInfoThree[combinedDay] = workouts[W].data[props.throwThree];
            gatheredDates[combinedDay] = workouts[W].data.day;
            W = W+1;
            combinedDay++;

        }
        while(L<lifts.length){
            gatheredLiftsOne[combinedDay] = lifts[L].data.WeightOne;
            gatheredLiftsTwo[combinedDay] = lifts[L].data.WeightTwo;
            gatheredDates[combinedDay] = lifts[L].data.day;
            
            gatheredLiftsOne[combinedDay] = lifts[L].data.WeightOne;
            gatheredLiftsTwo[combinedDay] = lifts[L].data.WeightTwo;
            gatheredRepsOne[combinedDay]  = lifts[L].data.RepsOne;
            gatheredRepsTwo[combinedDay]  = lifts[L].data.RepsTwo;
            gatheredNameOne[combinedDay]  = lifts[L].data.NameOne;
            gatheredNameTwo[combinedDay]  = lifts[L].data.NameTwo;

            L = L+1;
            combinedDay++;

        }
        
        gatheredGoals[combinedDay-1] = goal[0].data[props.event];

        const data = {
            labels: gatheredDates,
            datasets: [{
                    label: props.throwOne,
                    data: gatheredInfoOne,
                    backgroundColor: 'aqua',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Distance',
                    spanGaps: true,
                    
                },{
                    label: props.throwTwo,
                    data: gatheredInfoTwo,
                    backgroundColor: 'red',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Distance',
                    spanGaps: true,
                },{
                    label: props.throwThree,
                    data: gatheredInfoThree,
                    backgroundColor: 'yellow',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Distance',
                    spanGaps: true,
                },{
                    label: "primary Lift",
                    data: gatheredLiftsOne,
                    backgroundColor: 'green',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Weight',
                    showLine: false
                },{
                    label: "Secondary Lift",
                    data: gatheredLiftsTwo,
                    backgroundColor: 'brown ',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Weight',
                    showLine: false
                },{
                    label: "Goal",
                    data: gatheredGoals,
                    backgroundColor: 'purple ',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Distance',
                    spanGaps: true,
                }
            ]
        }

        
        const options ={
            responsive: true,
            pointRadius: 3,
            pointHoverRadius: 5,
            plugins:{
                tooltip:{
                    callbacks:{
                        afterTitle: function(context){
                            return '____________________'
  
                        },
                        afterBody: function(context){
                            if(context[0].datasetIndex === 3){
                                return ["Lift Name: "+gatheredNameOne[context[0].dataIndex],"Reps: "+gatheredRepsOne[context[0].dataIndex]];
                            }else if(context[0].datasetIndex === 4){
                                return ["Lift Name: "+gatheredNameTwo[context[0].dataIndex],"Reps: "+gatheredRepsTwo[context[0].dataIndex]];
                            }
                        },
                         
                        
                    }
                }
            },
            scales:{
                Distance:{  
                    position: 'left',
                },
                Weight:{
                    
                    position: 'right',
                },
            }
        }

        return(
            <div>
               <h2>
                    {props.event}:
                </h2>
                <Line 
                    data={data}
                    options={options}

                ></Line> 
            </div>
            
            
        )

    }

    useEffect(() => {
        getWorkouts();
    },[])

    if(loading1 || loading2||loading3){
        return <h1>loading data</h1>;
    }

    return(
        <div>
            
            <Display workouts/>
        </div>
    );
}

export default Graph;