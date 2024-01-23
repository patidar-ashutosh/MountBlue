const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');
const router = express.Router();

// Gets All Members
router.get('/', (request,response) => {
    response.json(members);
});

// Get Single Member    
router.get('/:id', (req, res) => {

    const found = members.some( (members) => {
        return members.id === Number(req.params.id);
    });

    if(found){
        res.json( members.filter( (members) => {
            return members.id === Number(req.params.id);
        }));
    }
    else{
        res.status(400).json( {msg : `No member with the id of ${req.params.id}`});
    }
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active'
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json( {msg : 'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
});

// Update Member
router.put('/:id', (req, res) => {    
    const found = members.some( (members) => {
        return members.id === Number(req.params.id);
    });

    if(found){
        const updateMember = req.body;
        members.forEach( (members) => {
            if(members.id === Number(req.params.id)){
                members.name = updateMember.name ? updateMember.name : members.name;
                members.email = updateMember.email ? updateMember.email : members.email;

                res.json({msg : "Memeber updated", members});
            }
        });
    }
    else{
        res.status(400).json( {msg : `No member with the id of ${req.params.id}`});
    }
});

// Delete Member
router.delete('/:id', (req, res) => {

    const found = members.some( (members) => {
        return members.id === Number(req.params.id);
    });

    if(found){
        res.json({
            msg : 'Member Deleted',
            members : members.filter( (members) => {
                return members.id !== Number(req.params.id);
            })
        });
    }
    else{
        res.status(400).json( {msg : `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;