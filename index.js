const express = require('express');
const port = 9000;
const app = express();

app.listen(port,function(err){
    if(err){
        console.log(`Error in ruuning the server : ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});