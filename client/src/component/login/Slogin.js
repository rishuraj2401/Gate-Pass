import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { useHistory } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Navb from '../Navb'


function Slogin({setAuth}) {
    const navigate = useNavigate()
    // const history= useHistory()
    const [logs, setLogs] = useState({ sEmail: "", spassword: "" })
    const [errr, setErr] = useState({ emEr: '', paEr: '' })
    const onchanging = (e) => {
        // e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setLogs({ ...logs, [name]: value })
    }
    const { sEmail, spassword } = logs;
    var onlogin = async (e) => {
        e.preventDefault();
    if (!sEmail || !spassword) {
        if (!sEmail && !spassword) {
            setErr({ ...errr, emEr: '*Required', paEr: "*Required" })
        }

        else {
            if (!sEmail) {
                setErr({ ...errr, emEr: '*Required', paEr: '' })
            }
            if (!spassword) {
                setErr({ ...errr, emEr: "", paEr: "*Required" })
            }
        }

    }



    else {
    fet();
    }
}
const fet = async()=>{
     
    const responsed = await fetch("/Slogin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sEmail: sEmail, spassword: spassword })
    })
    var dat =  responsed.json();

    const data = await responsed.status === 404
    //  console.log(dat);


    if (data) {
        // window.alert("invalid");
        // e.status(404).send("not found")
        setErr({ ...errr, emEr: '*Incorrect credential', paEr: "*Incorrect credential" })
        console.log("invalid")
    }
    else {
        // window.alert("perfect registration");
        console.log("succccccessssssful")
//             console.log(dat);
        //   history.push("/Gatepass");
        setAuth(true);
        navigate("/Gatepass")
       

    }
}
// useEffect(()=>{
//   fet();
// },[])
    return (
        <>
            {<Navb  />}
            <div className='slogin'>
                <div className="lo"></div>
                <div className='log1'>
                    <div className="log1a">
                     <p>𝐒𝐭𝐮𝐝𝐞𝐧𝐭 𝐏𝐨𝐫𝐭𝐚𝐥</p>
                    </div>
                    {/* <div className="log1a"></div> */}
                    <div className="log1b">
                        <label htmlFor="">𝓔𝓶𝓪𝓲𝓵  <span>{errr.emEr}</span><br/></label>
                       <input type='email' className='log2' name="sEmail" value={logs.sEmail} onChange={onchanging} /> 
                        <label htmlFor="">𝓟𝓪𝓼𝓼𝔀𝓸𝓻𝓭 <span>{errr.paEr}</span></label>
                        <input type='password' className='log2' name="spassword" value={logs.spassword} onChange={onchanging} /><br/> 
                       
                        <div className="log">
                    <button type='submit' onClick={onlogin}>Login</button>
                    <p><Link to="/" id="log">𝒟𝑜𝓃'𝓉 𝒽𝒶𝓋𝑒 𝒶𝓃 𝒶𝒸𝒸𝑜𝓊𝓃𝓉? 𝑅𝑒𝑔𝒾𝓈𝓉𝑒𝓇 𝒽𝑒𝓇𝑒 </Link></p>
                </div>
                    </div>
                    {/* <div className="log1a"></div> */}
                </div>
               
            </div>
        </>
    )
}

export default Slogin
