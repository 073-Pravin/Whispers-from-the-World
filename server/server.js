import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.send("<h1>Welcome to the server</h1>");
})

app.get('/api',async (req,res)=>{
    try {
        console.log(req.query);
        const { country, category, apiKey, page, pagesize  } = req.query;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pagesize=${pagesize}`
        // const {url} = req.params;
        console.log("URL: ",url);
        const data = await fetch(`${url}`);
        const jsonData = await data.json();
        console.log(jsonData);
        res.status(200).json(jsonData);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})