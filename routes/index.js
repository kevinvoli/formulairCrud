var express = require('express');
var router = express.Router();
const {UserQuery} = require('../controller/user.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});
router.post('/',async(req,res,next)=>{
  console.log(req.body)
 
  let data= req.body
  const result= await UserQuery.setUser(data).then((result)=>{
    console.log("'resultar de l'enregistrement :",result)
      res.redirect('/')
    }).catch((err)=>{
      console.log("erreur de l'ajout :",err)
      res.render('index')
    })

})
module.exports = router;
