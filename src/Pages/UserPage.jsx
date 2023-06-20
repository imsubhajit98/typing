import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Footer from "../Components/Footer";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import Header from "../Components/Header";

const UserPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [user, loading] = useAuthState(auth);

  const fetchUserData = () => {
    const resultsRef = db.collection("Results");
    const {uid} = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];

    resultsRef
    .where("userId", "==", uid)
    .orderBy("timeStamp", "desc")
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc)=> {
        tempData.push({...doc.data()});
        tempGraphData.push([
            doc.data()
            .timeStamp
            .toDate().toLocaleString().split(",")[0],
            doc.data().wpm
          ]);
      });
      console.log(tempData);
      console.log(tempGraphData);
      setData(tempData);
      setGraphData(tempGraphData)
      setDataLoading(false);
    })
  }
  
  useEffect(()=> {
    if(!loading) {
      if(!user) {
        navigate("/");
      } else {
        fetchUserData();
      }
    }
  }, [loading])

  if(loading || dataLoading) {
    return <div className="center-of-screen">
      <CircularProgress size={250} />
    </div>
    
    
  }
  
  return (
    <div className="canvas">
      <Header />
      <UserInfo totalTestsTaken={data.length} />
      <div className="graph-user-page">
        <Graph graphData={graphData} />
      </div>
      <TableUserData data={data} />
      <Footer/>
    </div>
  )
}

export default UserPage