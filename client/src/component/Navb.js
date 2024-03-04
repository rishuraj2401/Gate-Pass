import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import cookie from 'react-cookie';
function Navb({isAuthenticated, Lname,setAuth}) {
  const mystyle={
    color:"#F2E3D5" ,
    fontWeight:"bold", 
    textShadow: "0.2vw 0.2vw 0.6vw #012E40",
    fontSize:"1.1em"
    } 
    const handleLogout = () => {
      // Delete the 'jwt' cookie

      // if (jwtCookie) {
      //   console.log('Cookie exists:', jwtCookie);
      //   // Additional logic for handling the existence of the cookie
      // } else {
      //   console.log('Cookie does not exist',document.cookie);
      //   // Additional logic for handling the non-existence of the cookie
      // }
  console.log("kuch");
      cookie.remove('jwt', { path: '/' });
      setAuth(false);
  
      // Additional logic for logging out or redirecting the user
    };
  return (
    
    <>
<div className="nav" style={{ maxHeight:"5vh"}}>
<nav className="navbar navbar-expand-lg navbar-light">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav" style={{display:"flex", justifyContent:"space-between", alignItems:"center" , width:"95vw"}}>
    <div className="navbar-nav">
      <Link className="navbar-brand" to="/" style={mystyle}>ℌ𝔬𝔪𝔢</Link>
      <Link className="nav-item nav-link " to="/Gatepass"style={mystyle}>𝔖𝔱𝔲𝔡𝔢𝔫𝔱 <span className="sr-only">(current)</span></Link>
      <Link className="nav-item nav-link" to="/Permit"style={mystyle}>ℌ𝔬𝔰𝔱𝔢𝔩 ℑ𝔫𝔠𝔥𝔞𝔯𝔤𝔢</Link>
      <Link className="nav-item nav-link" to="/Gaurd"style={mystyle}>𝔊𝔞𝔱𝔢-𝔊𝔲𝔞𝔯𝔡</Link>
      </div>
      <div className="navbar-nav1">
      {isAuthenticated? (<div className='navbar-nav1' style={{ display:"inline-flex", alignItems:"end" , justifyContent:"space-between"}}>
      <Link className="nav-item nav-link" to="#"style={mystyle}>{Lname}</Link>
      <Link className="nav-item nav-link" to="/"onClick={handleLogout} style={{border:"2px solid", color:"#F2E3D5" ,
    fontWeight:"bold", 
    textShadow: "0.2vw 0.2vw 0.6vw #012E40",
    fontSize:"1.1em"}} >Logout
        {/* <p className="" style={{}} onClick={handleLogout}>Logout</p> */}
        </Link>

      </div>):(<></>)}
     
    </div>
    </div>
  </div>
</nav>
</div>
 
    </>
  )
}

export default Navb
