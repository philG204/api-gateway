const express = require('express');
const request = require('request');
const app = express();

// Endpoint for user-managment API
app.get('/users', (req, res) => {
   
    console.log("Request for user-managment API"); 
    console.log(req.query.id);
    if(req.query.id != null){
            request.get('http://localhost:3000/users/'+req.query.id, (error, response, body) => {
            if (error) {
                console.log("Some error occurred");  
                res.status(500).send(error);
                return;
            }
            console.log("Sending users information");
            res.set('Content-Type', 'application/json');
            res.send(body);
        });
    }
    else{
        request.get('http://localhost:3000/users', (error, response, body) => {
        if (error) {
            console.log("Some error occurred");  
            res.status(500).send(error);
            return;
        }
        console.log("Sending users information");
        res.set('Content-Type', 'application/json');
        res.send(body);
    });
    }
});

app.post('/users/create', (req, res) => {
    console.log(req.body);
    const options = {
        method: 'POST',
        url: 'http://localhost:3000/users/create',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          key: 'value',
        },
        json: true,
      };
      
      request(options, (error, response, body) => {
        if (error) {
          console.error(error);
        } else {
          console.log(response.statusCode);
          console.log(body);
        }
      });
    res.send('OK');
  });

  app.delete('/remove', (req, res) => {
    request.delete('http://localhost:3000/users/remove/'+req.query.id, (error, response, body) => {
        if (error) {
            // Handle the error
            console.error(error);
            return;
        }   

        console.log(response.statusCode);
        res.send('OK');
    });
  });

app.listen(3100, () => console.log('API Gateway listening on port 3100...'));