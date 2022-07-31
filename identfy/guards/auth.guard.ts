import axios from "axios";
import express from "express";

const Guard = async (req: express.Request, res: express.Response, next:express.NextFunction) => {
    await axios.post("http://localhost:3003/isLogined", {
        headers: {
            "Authorization": req.headers.authorization
        }
    }).then(response => {
        if(response.status === 200){
            console.log(response.statusText)
            next();
        }
    }).catch(error => {
        console.log(error);
        res.status(401).json({
            message: "Invalid token"
        });
    });
}

export default Guard;