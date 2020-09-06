const {User,Post} = require('../models');
const { to, ReE, ReS, isNull, isEmpty } = require('../services/util.service');
const HttpStatus = require('http-status')

exports.postCreate = async (req, res) => {

    const user = req.user;
    let  err,exisitingUser;

    [err, exisitingUser] = await to(User.findById(user._id));

    if(err){return ReE(res,err, HttpStatus.INTERNAL_SERVER_ERROR)}

    if(!exisitingUser){
        return ReE(res,{message:'User doesn\t exisit'},HttpStatus.BAD_REQUEST)
    }

    let newPost;

    [err,newPost] = await to(Post.create({...req.body,poster: user._id}))

    if(err){
        return ReE(res, err,HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if(!newPost){
        return ReE(res,{message:'Post doesn\t created. Try again!'})
    }

    return ReS(res,{message:'Post created',post:newPost},HttpStatus.OK)

}

exports.getAllPost = async (req,res) => {

    let user = req.user;
    let err, exisitingUser;

    [err, exisitingUser] = await to(User.findById(user._id));

    if(err){return ReE(res,err, HttpStatus.INTERNAL_SERVER_ERROR)}

    if(!exisitingUser){
        return ReE(res,{message:'User doesn\t exisit'},HttpStatus.BAD_REQUEST)
    }

    let posts;

    [err,posts] = await to(Post.find({},{}).sort({postTime:-1}).populate({path:'poster',select:['name','profilePic']}));

    if(err){
        return ReE(res, err,HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if(!posts){
        return ReE(res,{message:'Dosenot have any posts.!'})
    }

    return ReS(res,{message:'Post got',posts:posts},HttpStatus.OK)
}