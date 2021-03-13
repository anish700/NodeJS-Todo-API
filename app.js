
const http = require('http');
const express = require('express');
const app = express();
app.use(express.json());

const port=8000;
let todoList = ["Complete nodejs ", "Play football"];

app.get('/todos', (req, res) => {
    res.send(todoList);

});
app.post('/todos', (req, res) => {
    body=req.body;
    todoList.push(body.name);
    console.log(todoList);
    res.status(201);
});
app.delete('/todos', (req, res) => {
    let deleteTodo=req.body.name;
    for (let i =0;i<todoList.length;i++){
        if (todoList[i]==deleteTodo){
            todoList.splice(i , 1);
            res.status(204);

        }
    }
});
app.all("/todos", (request, response) => {

    response.status(501).send()

})
app.all("*", (request, response) => {

    response.status(404);

    response.send("<Custom 404 message>");

})
app.listen(port, () => {
    console.log(`Server is up at ${port}`);
 });