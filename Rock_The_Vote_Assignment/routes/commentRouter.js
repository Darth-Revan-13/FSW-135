const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

//Get All
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

//Post One
commentRouter.post("/", (req, res, next) => {
    const newComment = new Comment(req.body)
    newComment.date = new Date
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//Delete One
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete({_id: req.params.commentId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database.`)
    })
})

//Update One
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, (err, updatedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedComment)
    })
})

module.exports = commentRouter