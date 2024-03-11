import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();
app.get('/',(req, res) => {
    res.send("<h1>Welcome to newsapp backend</h1>");
});
app.post('/api',async  (req,res)=>{ // req is the request object, res is the response object
    // console.log(req.body);
    const {country,category,apikey,page,pageSize} = req.body;
    
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pagesize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json(); 
    // console.log(parsedData);
    // Return the response as JSON
    return res.status(200).json(parsedData); // parsedData is the response from the API in JSON format
});

// Set up a port, defaulting to 5000 if not set in environment variables
let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});
