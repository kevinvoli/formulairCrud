var express = require('express');
var router = express.Router();
const {UserQuery} = require('../controller/user.controller')


/* GET users listing. */
router.get('/:id', async(req, res, next)=> {
    console.log('id: ', req.params.id)
    const user= await UserQuery.getOneUser(req.params.id)
    console.log(user)
    res.render('modifie',{user:user})
});

router.post('/',async(req,res)=>{
    console.log('ma bodu est la :',req.body)
    const user= await UserQuery.updateUser(req.body)
    res.redirect('/admin')
})

module.exports = router;
