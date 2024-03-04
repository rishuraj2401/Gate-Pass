//  const { getSpaceUntilMaxLength } = require("@testing-library/user-event/dist/utils");
const express = require("express");
const dotenv = require("dotenv")
const path = require("path");
const { getMaxListeners } = require("process");
const model = require("./model/model.js");
const registration = require("./model/registration.js")
// const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken")
const cookieParser = require("cookie-parser")
dotenv.config({ path: './config.env' })
app = express();
const cors= require("cors")
app.use(cors("*")) 
const secretKey="Rishu@2002"
app.use(express.json());
app.use(cookieParser());
const cregistration = require("./model/Cmodel.js")
require("./conne");

    app.get("/student", (req, res)=>{
        const token= req.cookies?.jwt;
        if(!token) res.status(401).json({mess:"error"});
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(401).json({mess:"error"});
            }
    
            req.user = user;
        res.status(200).json(user)
    });   
    })
    app.get("/college", (req, res)=>{
        const token= req.cookies?.jwt2;
        if(!token) res.status(401).json({mess:"error"});
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(401).json({mess:"error"});
            }
    
            req.user = user;
        res.status(200).json({user:user,message:"authenticated"}) 
    });   
    })
app.post("/cregister", async (req, res) => {
    const { cEmail, cpassword } = req.body;

    try {
        const creg = new cregistration({ cEmail, cpassword });
        await creg.save();
        console.log(req.body);
        res.status(200).send({ messaage: req.body });
    }
    catch (err) {
        console.log(err)

    }   
})
app.post("/clogin", async (req, res) => {
    const { cEmail, cpassword } = req.body;
    // if (!cEmail ||!cpassword){
    //    return res.status(400).send("fill properly")
    // //    window.alert("pls")
    // }
    // else{
    try {
        const user = await cregistration.findOne({ cEmail: cEmail })
        // res.send("emailfound")
        if (!user || user.cpassword!==cpassword) {
            console.log("baddddd")
            return res.status(404).send("invalid credentials")
        }
        const token = jwt.sign({userId:user._id, userEmail: user.cEmail},secretKey, {expiresIn:'1h'})
        res.cookie('jwt2', token, {httpOnly: false , sameSite: 'None', secure: true})
        res.json({message: "Login successful"})
    }
    catch (err) {
        console.log("error" + err)
    }
}
)


app.post("/sregister", async (req, res) => {
    const { sname, sEmail, sRoll, spassword, scpassword } = req.body;
    if (spassword != scpassword) {
        res.status(404).send("passwords not matching");
    } else {
        try {
            const sreg = new registration({ sname, sEmail, sRoll, spassword, scpassword });
            if (!sname || !sEmail || !sRoll || !spassword || !scpassword) {
                res.status(404).send("required")
            }
            
            else {
                // const isMatch =await bcrypt.compare(cpassword , )
                // const useremail = await sreg.findOne({ sEmail: sEmail })

                // if(same){
                //     res.status(404).send("already registered");
                // }
                // else{
                await sreg.save();
                console.log(req.body);
                res.status(200).send({ messaage: req.body });
            // }
            }
        }
        catch (err) {
            console.log(err)

        }
    }
});

app.post("/Slogin", async (req, res) => {
    const { sEmail, spassword } = req.body;
    try {
        const user = await registration.findOne({ sEmail: sEmail })
        // res.send("emailfound")
        if (!user || user.spassword!==spassword) {
            console.log("baddddd")
            return res.status(404).send("invalid credentials")
        }
        const token = jwt.sign({userId:user._id, userEmail: user.sEmail, userName:user.sName},secretKey, {expiresIn:'1h'})
        res.cookie('jwt', token, {httpOnly: false , sameSite: 'None', secure: true})
        res.json({message: "Login successful"})
    }
    catch (err) {
        console.log("error" + err)
    }
})

function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }

        req.user = user;
        next();
    });
}

    

app.post("/register", authenticateToken, async (req, res) => {
    const { name, Department, Branch, Sem, Roll, Room, Lt, Ld, Rd, Rt, Add, Pur } = req.body;

    try {

        let stdata = new model({ name, Department, Branch, Sem, Roll, Room, Lt, Ld, Rd, Rt, Add, Pur });
        const t = await stdata.save();
        console.log(req.body);
        res.status(200).send({ messaage: req.body });
        if (!t) {
            window.alert("fill correctly")
            res.status(400).send("fill correctly")
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
});
app.post("/Permi", async (req, res) => {
    const { roll } = req.body
    try {
        // const roll=req.body 
        const userroll = await model.findOne({ Roll: roll });
        console.log(userroll)
        // res.json(userroll)
        if (!userroll) {

            console.log('badd');
            return res.status(404).send("user not exist")
        }
        else {
            res.json(userroll)
        };
    }
    catch (err) {
        res.send("error");
    }


}
);

app.get("/Permi", async (req, res) => {
    const aa = await model.find()
    res.json(aa)
    console.log(aa);
});





app.put("/Permi", async (req, res) => {
    const { roll } = req.body
    try {
        // const roll=req.body 

        const userrolll = await model.updateOne({ Roll: roll }, {
            $set: { Permitted: "Yes fully verified ,let him go" }
        })
        const userroll = await model.findOne({ Roll: roll });
        console.log(userroll)
        res.json(userroll)
     
    }
    catch (err) {
        res.send("error" + err);
    }
}
); app.put("/Per", async (req, res) => {
    const { roll } = req.body
    try {
       
        const userrolll = await model.updateOne({ Roll: roll }, {
            $set: { Allowed: "Yes allowed to go" }
        })
        const userroll = await model.findOne({ Roll: roll });
        console.log(userroll)
        res.json(userroll)
       
    }
    catch (err) {
        res.send("error" + err);
    }


}
);
app.put("/Ret", async (req, res) => {
    const { roll } = req.body
    try {
     

        const userrolll = await model.updateOne({ Roll: roll }, {
            $set: { return: "Yes (Gatepass Expired)" }
        })
        const userroll = await model.findOne({ Roll: roll });
        console.log(userroll)
        res.json(userroll)
        
    }
    catch (err) {
        res.send("error" + err);
    }


}
);
if ("production" == "production") {
   
 
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
    })
}


app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    console.log('Node server is totally running...');
});
