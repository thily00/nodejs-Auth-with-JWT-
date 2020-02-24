const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) =>{

    //telephone verification
    const telephoneExist = await User.findOne({telephone:req.body.telephone});
    if (telephoneExist) return res.status(400).send('telephone already exist');

    //passwrd hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        pseudo:req.body.pseudo,
        telephone:req.body.telephone,
        password:hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
    
    
})

router.post('/login', async(req,res)=>{
    const user = await User.findOne({telephone:req.body.telephone});
    if (!user) return res.status(400).send('telephone not found');

    const validPass =await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('invalid password')

    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);
})

module.exports = router;