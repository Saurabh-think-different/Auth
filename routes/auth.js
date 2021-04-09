const router = require('express').Router()
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')
const { hashpassword, checkHash } = require('../validation')


router.post('/register', async (req, res)=>{


    //Check for Register Validation from Joi
    const { error } = registerValidation(req.body)
    if(error) return res.send(error.details[0].message)

    //Check if email exists? No point in registering again : Register new email 
    const emailExists = await User.findOne({ email: req.body.email})
    if(emailExists) return res.send("Email exists")

    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: hashpassword(req.body.password)
    })

    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
    
})

router.post('/login', async (req, res)=>{
    //Check for Login Validation from Joi
    const { error } = loginValidation(req.body)
    if(error) return res.send(error.details[0].message)

    //Check if Email Exists? Validate Password : Throw error
    const user = await User.findOne({ email: req.body.email})
    if(!user) return res.send("Email or password is not correct")

    //Validating password from Bcrypt
    const validPassword = await checkHash(req.body.password, user.password)
    if(!validPassword) return res.send('Invalid Password')

    res.send('Logged In Successfully')

})

module.exports = router
