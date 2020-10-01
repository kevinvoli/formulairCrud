const { isValidObjectId } = require('mongoose')

const User = require('../models/registerModel').User


exports.UserQuery= class{
    static setUser(data){
        return new Promise(async(next)=>{
            const user = new User({
                name: data.name,
                lastName: data.lastname,
                email:data.email,
                numero:data.number
            }).save().then((user)=>{
                console.log(user)
                next(user)
            }).catch((err)=>{
                console.log(err)
                next({errors:err})
            })
        })
    } 
    static getOneUser(data){
        return new Promise(async(next)=>{
            User.findById({_id:data}).then((user)=>{
                console.log("utilisateur",user)
                next({user})
            }).catch((err)=>{
                console.log(err)
                next({errors:err})
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


    static getAllUser(data){
        return new Promise(async(next)=>{
            User.find({}).then((user)=>{
                console.log(user)
                next(user)
            })
        })

    }
    static updateUser(data){
        return new Promise(async(next)=>{
            User.findOneAndUpdate(data.id).then((user)=>{
             
                user.name=data.name;
                user.lastName=data.lastname;
                user.email=data.email;
                user.numero= data.number;
                console.log('user a updaté : ',user)
                user.save()
                console.log('user a updaté : ',user)
                next({user:user})
            }).catch((err)=>{
                next(err)
            })
        })
    }
    static delectUser(data){
        return new Promise(async(next)=>{
            User.findByIdAndDelete(data).then(async(user)=>{
                next(user)
            })
        })
    }
}