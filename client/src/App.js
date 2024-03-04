import React, { useEffect, useState } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Navbar} from './Navbar';
import {  BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import {Form} from './component/Form';
// import Navb from './Navb;
import Gatepass from './component/protected/Gatepass';
import Permit from './component/protected/Permit';
import Gaurd from './component/protected/Gaurd';
import Home from './component/Home';
import Slogin from './component/login/Slogin';
import Glogin from './component/login/Glogin';
import Hlogin from './component/login/Hlogin';
import Protected from './component/Protected';

function App() {
  const [isAuthenticated, setAuth] =useState(false)
  const [isAuthenticated1, setAuth1] =useState(false)
  const [name, setName]= useState("")

  useEffect(()=>{
       fetch("/student", {method:"GET"})
      .then((res)=>{if(res.status===200){
        console.log("response1", res.json);
        // setName(res.user.sName)
        
        setAuth(true);
      }})
      
      .catch((error)=>console.log(error));
      fetch("/college", {method:"GET"})
      .then((res)=>{if(res.status===200){
        console.log("response2");
        setAuth1(true);
      }})
      
      .catch((error)=>console.log(error))
   
   
  },[])
  return (
    <>
    <Router>
      <Routes>
        <Route path="/Slogin" element={<Slogin setAuth={setAuth}/>}></Route>
      </Routes>
      <Routes>
        <Route path="/Glogin" element={<Glogin setAuth={setAuth1}/>}></Route>
      </Routes>
      <Routes>
        <Route path="/Hlogin" element={<Hlogin setAuth={setAuth1}/>}></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Routes>
        <Route path="/Form" element={<Form/>}></Route>
      </Routes>
      <Routes>
        <Route path="/Permit" element={<Protected isAuthenticated={isAuthenticated1} login={"/Hlogin"}>
          <Permit isAuthenticated1={isAuthenticated1} Lname="HostelOffice" setAuth1={setAuth1}/> </Protected>}></Route>
      </Routes>
      <Routes>
        <Route path="/Gaurd" element={<Protected isAuthenticated={isAuthenticated1} login={"/Glogin"}>
          <Gaurd isAuthenticated1={isAuthenticated1} Lname="Gaurd" setAuth1={setAuth1}/></Protected>}></Route>
      </Routes>
      <Routes>
        <Route path="/Gatepass" element={<Protected isAuthenticated={isAuthenticated} login="/Slogin">
          <Gatepass isAuthenticated={isAuthenticated} Lname={name} setAuth={setAuth}/> </Protected>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
