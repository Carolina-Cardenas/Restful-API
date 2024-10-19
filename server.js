import express from "express";

const app= express();

app.use (express.json());

const PORT = 3000;

app.listen(PORT,()=>{
    console.log (`server is runnig im http://localhost:${PORT}`)
});

let books= [
    {
 id: 1,
 title:"1984",
 author: "George Orwell",
},
{
    id: 2,
    title: "The Hobbit",
    author: "J.R.R Tolkien",
},
]; 
app.get("/getAllBooks", (req, res) => {
    res.json(books)
})

app.post("/addNewBook", (req, res )=>{
 const newbook = {
   id: books.length +1,
   title: req.body.title,
   author: req.body.author,
 };
books.push(newbook);
res.json ({ message:"Book added successfully", book:newbook});

});

app.put( "/updateBook/:id" ,(req, res)=>{
    const bookId = parseInt (req.params.id)
    const foundBook = books.find((b) => b.id === bookId)
    if (!foundBook){
   return res.status(404).json({message: "books not found!" });   
}

foundBook.title = req.body.title || foundBook.title;
foundBook.author = req.body.author || foundBook.author;
res.json ({ messages: "Book uppdated successfully", foundBook })
});

app.delete("/deleteBook/:id", (req, res) =>{
    const bookId = parseInt (req.params.id)
    books = books.filter((b) => b.id === bookId)
    res.json ({ messages: "Book deleted successfully",books })
})