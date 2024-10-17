const express = require('express')

const router = express.Router()


router.use('/', (req,res,next) => {
    console.log("Hello from user route")
    next()
})

router.get('/getAllUsers', (req,res) => {

})

module.exports = router