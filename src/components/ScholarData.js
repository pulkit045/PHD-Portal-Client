import React from "react";
import Data from "./Data";
import SecondData from "./SecondData";

function ScholarData(props) {
  // console.log();
  const {setScholarData} = props;
  const { data } = props;
  const { dt } = data;
  // console.log(dt);
  const {flt_nin} = data;
  // console.log(data);
  const { firstName, requests, enrollmentNumber, supervisor, _id} = dt;
  // console.log(supervisor);
  return (
    <>
      <h1>
        Hi
        {" "}
        {firstName} {enrollmentNumber}{" "}
      </h1>
      {supervisor !== "NA" ? <h1>{supervisor}</h1> :  <ul>
        {requests.map((request,index) => {return <Data request={request} setScholarData={setScholarData} key={index}/>})}
        {flt_nin.map((flt,index)=>{return <SecondData key={index} msg={"Did not Send"} flt={flt} setScholarData={setScholarData} scholar_id={_id}/>})}
      </ul>}
     
    </>
  );
}

export default ScholarData;
