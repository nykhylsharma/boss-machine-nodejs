const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const{getAllFromDatabase, 
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId} = require('./db');

//validate if the id exists in the DB
ideasRouter.param('ideasId',(req,res,next,id)=>{
    let idea = getFromDatabaseById('ideas',id);
    if(idea){
        req.idea = idea;
        next();
    }
    else{
        res.status(404).send('Not found')
    }
})

//get all ideas from DB
ideasRouter.get('/',(req, res)=>{
    res.send(getAllFromDatabase('ideas'));
});

//create a new idea and save it to DB
ideasRouter.post('/',checkMillionDollarIdea, (err, req, res, next)=> {
    res.status(500).send('something broke');
    //res.render('error', { error: err })
  },(req,res)=>{
    res.send(addToDatabase('ideas',req.body));
})

//get an idea by its Id from the DB
ideasRouter.get('/:ideasId',(req,res)=>{
    res.send(req.idea);
})

//update a single idea by Id
ideasRouter.put('/:ideasId',(req,res)=>{
    res.send(updateInstanceInDatabase('ideas',req.body));
})

//delete a single by Id
ideasRouter.delete('/:ideasId',(req,res)=>{
    res.send(deleteFromDatabasebyId('ideas',req.params.ideasId));
})
