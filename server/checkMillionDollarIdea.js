const checkMillionDollarIdea = (req,res, next) => {
    let ideaValue = int(req.body.numWeeks*req.body.weeklyRevenue);
    if((ideaValue) > 1000000){
        console.log(`The idea is worth ${ideaValue}`);
        next();
    }
    else{
        res.status(502).send('The idea is worth '+ ideaValue+' only!');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
