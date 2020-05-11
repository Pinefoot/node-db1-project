const express = require('express');

const db = require('../data/dbConfig');
const router = express.Router();



router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts =>{
        res.status(200).json({data: accounts})
    }).catch(err =>{
        res.status(500).json({message : err.message})
    })
})

router.get('/:id', (req, res) => {
    db('accounts')
    .where({id : req.params.id})
    .first()
    .then(accounts =>{
        if(accounts){
            res.status(200).json({ data: accounts})
        }else{
            res.status(404).json({message: 'No accounts with this ID fool!'})
        }
    }).catch(err =>{
        res.status(500).json({message:  err.message})
    })
    
})

router.post('/', (req, res) => {
    const post = req.body;
    //need to wrap this in a conditional validation eventually
    if (isValid(post)){
    db('accounts')
    .insert(post, "id")
    .then(ids =>{
        res.status(201).json({data: ids});

    }).catch(err =>{
        console.log(err)
        res.status(500).json({message : error.message})
    })
    }
    else{
        res.status(400).json({message : 'add those required name and budget fields fool!'})
    }
    
})

router.put('/:id', (req, res) => {
    const updates = req.body;
    if (isValid(updates)){
    db('accounts')
    .where({id: req.params.id})
    .update(updates)
    .then(records =>{
        if(records > 0 ){
            res.status(200).json({data: records})
        }else{
            res.status(404).json({message: "this record of tax evasion and possible fraud has been shredded....I mean it could not be found."})
        }
    }).catch(err =>{
        res.status(500).json({message: err.message})
    })
}else{
    res.status(400).json({message : 'look you can\'t just go around updating shit all willy nilly without giving me the info that I need to update it here. Come on, grow up.'})
}
})

router.delete('/:id', (req, res) =>{
    db('accounts')
    .where({id:req.params.id})
    .del()
    .then(records =>{
        if(records > 0){
            res.status(200).json({data: records})
        }else{
            res.status(404).json({message: 'These records they are forbidden from viewing because you eyes could not handle it'})
        }
    }).catch(err =>{
        res.status(500).json({message: err.message})
    })
})


function isValid(account){
    return Boolean(account.name && account.budget)
}





module.exports = router;