// import React from "react";
// import Data from "./Data";
// import SecondData from "./SecondData";

// function ScholarData(props) {
//   const {setScholarData} = props;
//   const { data } = props;
//   const { dt } = data;
//   const {flt_nin} = data;
//   const { firstName, requests, enrollmentNumber, supervisor, _id} = dt;
//   return (
//     <>
//       <h1>
//         {firstName} {enrollmentNumber}{" "}
//       </h1>
//       { (typeof supervisor !== "undefined" && supervisor) ? <h1>{supervisor}</h1> :  <ul>
//          <li><Data requests={requests} caption={'Request Sent'} setScholarData={setScholarData}/></li>
//          <li><SecondData flt_nin={flt_nin} caption={'Request Did Not Send'} setScholarData={setScholarData} scholar_id={_id}/></li>
//       </ul>}
     
//     </>
//   );
// }

// export default ScholarData;
