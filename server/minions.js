const express = require('express');
const minionsRouter = express.Router();
var bodyParser = require('body-parser');
module.exports = minionsRouter;

//Fetch DB function from db.js

const { getAllFromDatabase,
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
 } = require('./db');
const app = require('../server');

//Check if minion ID exists in the DB and attach the minion object to req body and call next callback function.

minionsRouter.param('minionId',(req,res,next,id)=>{
    const minion = getFromDatabaseById('minions',id);
    if(minion){
        req.minion = minion;
        next();
    }
    else{
        res.status(404).send("Minion not found");
    }
})

//api to get the minions
minionsRouter.get('/',(req, res)=>{
    res.send(getAllFromDatabase('minions'));
});

//api to create a new minion
//app.use(bodyParser.json());
minionsRouter.post('/',(req, res)=>{
    addToDatabase('minions',req.body);
    res.status(201).send(req.body);
});

//get minion by single ID
minionsRouter.get('/:minionId',(req, res, next)=>{
    res.send(req.minion);
});

//put minion by single ID
minionsRouter.put('/:minionId',(req, res, next)=>{
    console.log(req.body)
    let updatedMinion = updateInstanceInDatabase('minions',req.body);
    console.log(updatedMinion);
    res.send(updatedMinion);
});

//delete a single minion by id

minionsRouter.delete('/:minionId',(req,res,next)=>{
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.send(getAllFromDatabase('minions'));
})