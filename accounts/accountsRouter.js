const express = require('express');

const db = require('../data/dbConfig');
const router = express.Router();

module.exports = router;

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
    db('accounts')
    .insert(post, "id")
    .then(ids =>{
        res.status(201).json({data: ids});

    }).catch(err =>{
        console.log(err)
        res.status(500).json({message : error.message})
    })
    
})

router.put('/:id', (req, res) => {
    const updates = req.body;
    db('accounts')
    .where({id: req.params.id})
    .update(changes)
    .then(records =>{
        if(records > 0 ){
            res.status(200).json({data: records})
        }else{
            res.status(404).json({message: "this record of tax evasion and possible fraud has been shredded....I mean it could not be found."})
        }
    }).catch(err =>{
        res.status(500).json({message: err.message})
    })
    
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