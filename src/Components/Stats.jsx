import React, { useEffect } from 'react'
import Graph from "./Graph"
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

const Stats = ({wpm, accuracy, correctWords , correctChars, incorrectChars, missedChars, extraChars, graphData}) => {

  const timeSet = new Set();
  const newGraph = graphData.filter((i) => {
    if(!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  })

  const pushDataToDB = () => {

    if(isNaN(accuracy)) {
      toast.error("Invalid test");
      return;
    }
    
    const resultsRef = db.collection("Results");
    const {uid} = auth.currentUser;
    console.log(auth.currentUser);

    resultsRef.add({
      wpm: wpm,
      accuracy: accuracy,
      timeStamp: new Date(),
      characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userId: uid,
    })
    .then((res)=> {
      toast.success("Data saved to the db");
    })
    .catch((err)=> {
      toast.error(err.code || "Not able to save result")
    })
  }

  useEffect(()=> {
    if(auth.currentUser) {
      pushDataToDB();
    }
    else {
      toast.warning("Login to save results");
    }
  }, [])

  return (
    <div className="stats-box">
        <div className="left-stats">
              <div className="title">WPM</div>
              <div className="subtitle">{wpm}</div>
              <div className="title">Correct Words</div>
              <div className="subtitle">{correctWords}</div>
              <div className="title">Accuracy</div>
              <div className="subtitle">{accuracy}</div>
              <div className="title">Characters</div>
              <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        </div>
        <div className="right-stats">
            {/* chart */}
            <Graph graphData={newGraph} />
        </div>
    </div>
  )
}

export default Stats