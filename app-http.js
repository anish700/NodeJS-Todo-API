
const http = require('http');
const port=8080;
let todoList = ["Complete nodejs ", "Play football"];

http.createServer((req , response)=>{

    const { headers, method, url } = req;
    if(url=='/todos'){
        if(method=="GET"){
            // Set response status code and response headers
    response.writeHead(200, { 'Content-Type': 'text/html' });
    // Set response body i.e, data to be sent
    response.write(todoList.toString());    
        }
        else if (method =="POST"){
            let body = '';
            req.on('data', (chunk) => {
            body+=chunk;
            }).on('end', () => {
                console.log(body);

                body = JSON.parse(body);
                console.log(body);
                let newTodo = body.name
                todoList.push(newTodo)

                response.writeHead(201);

            });
        }
        else if(method=="DELETE"){
            let body = '';
            req.on('data', (chunk) => {
            body+=chunk;
            }).on('end', () => {
                body = JSON.parse(body);
                let deleteTodo = body.name
                for(let i=0;i<todoList.length; i++){
                    if(todoList[i]==deleteTodo){
                        todoList.splice(i,1);
                    }

                }
 
                response.writeHead(201);

            });
        }
    }
    
    // Tell the server the response is complete and to close the connection
    response.end();


}).listen(port , ()=> {
     // Log text to the terminal once the server starts
     console.log(`Nodejs server started on port ${port}`)
})