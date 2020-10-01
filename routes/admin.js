var express = require('express');
var router = express.Router();
const {UserQuery} = require('../controller/user.controller')

/* GET users listing. */
router.get('/', async(req, res, next)=> {
  const red = await UserQuery.getAllUser()
  res.render('admin',{user:red})
});

router.get('/:id',async(req,res)=>{
  console.log("les parametee sont :",req.params.id)
  await UserQuery.delectUser(req.params.id)
  res.redirect('/admin')
})
module.exports = router;
