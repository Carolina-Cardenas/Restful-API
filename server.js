import express from "express";

const app= express();

app.use (express.json());

const PORT = 3000;

app.listen(PORT,()=>{
    console.log (`server is runnig im http://localhost:${PORT}`)
});

let users= [
    {
 id: 1,
 name:"Juan Perez",
 nationality: "Peruan",
},
{
    id: 2,
    name: "Zlatan Ibrahimovich",
    nationality: "Swedish",
},
]; 
app.get("/getAllUsers", (req, res) => {
    res.json(users)
})

app.post("/addNewUser", (req, res )=>{
 const newUser = {
   id: users.length +1,
   title: req.body.title,
   author: req.body.author,
 };
users.push(newUser);
res.json ({ message:"user added successfully", user:newUser});

});

app.put( "/updateUser/:id" ,(req, res)=>{
    const userId = parseInt (req.params.id)
    const founduser = users.find((b) => b.id === userId)
    if (!founduser){
   return res.status(404).json({message: "users not found!" });   
}

founduser.title = req.body.title || founduser.title;
founduser.author = req.body.author || founduser.author;
res.json ({ messages: "user uppdated successfully", founduser })
});

app.delete("/deleteUser/:id", (req, res) =>{
    const userId = parseInt (req.params.id)
    users = users.filter((b) => b.id === userId)
    res.json ({ messages: "user deleted successfully",users })
})