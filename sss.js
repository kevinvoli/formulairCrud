const bcrypt= require('bcrypt-nodejs')
const User=require('../models/index').User
exports.userQueries= class{
    static setUser(data){
        return new Promise(async(next)=>{
           const user= new User({
            nom:data.nom,
            pseudo:data.pseudo,
            password:bcrypt.hashSync(data.password,bcrypt.genSaltSync(10),null),
            email:data.email,
            number:data.number
           }).save().then((user)=>{
               console.log(user)
            next(user)
           }).catch((err)=>{
            next({etat:err})
           })
        })
    }
    static getUsers(datas){
        return new Promise(async(next)=>{
          User.findOne({
                email:datas.email,
            }).then(async(user)=>{

                console.log('salut 1',user)
                 let compar= await bcrypt.compare(datas.password,user.password,(err,res)=>{
                    console.log("dszdfcdcdcsc",err)
                    console.log('AASQSQSQSD',res)
                    if (err) {
                        console.log(err)
                        return res
                    }else{
                        console.log('salut res',res)
                        user.status='Online'
                        user.save()
                        return res
                    }
                })()
                console.log("cool marche bien:",compar)
                if(compar===true){ 
                    next(user)
                }else{
                    next(`echeec de l'enregistrement`)
                }
            }).catch((err)=>{
                next({
                    etat:err
                })
            })
        })
    }
    static getOneUserId(data){
        return new Promise(async(next)=>{
            User.findById(data).then((user)=>{
                user.status= 'Offline'
                user.save()
                next({ user})
            }).catch((err)=>{
                next(err)
            })
        })
    }
    static getallUsers(){
        return new Promise(async(next)=>{
            User.find({}).then((users)=>{
                next(
                    users
                )
            })
        })
    }
}

// loopback 
// Voici votre ID client    909676031206-n998o744ndibhfmba3opq2m5u42oepjq.apps.googleusercontent.com
// Voici votre code secret client   ghQfcCO4MvOlJ8ClWItMCPYV


// code d'autorisation      4/tAGcRSuErXHT0jx5OMIk3JRrl1zv-_74Q61L_xaHMK03AVVAjckajcgVO2pJ1bGCpz4TnzbtPkYHiIMCVSZ7rTo
const Message= require('../models/index').Message
const User=require('../models/index').User
new Message({})
exports.messageQueries= class{
    static setMesage(data){
        console.log(data)
        return new Promise(async(next)=>{
            const message = new Message({
                message:data.message,
                Users:data.id 
            }).save().then((message)=>{
                User.update({_id:data.id},{$push:{messag:message._id}})
                console.log("LES MESSAGES USERRRRR",message)
                    next(message)

            }).catch((err)=>{
                console.log("USERRRRR",message)
                next(err)
         })       
        })
    }

}
