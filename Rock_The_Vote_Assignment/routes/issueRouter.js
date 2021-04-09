const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

//Get All
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//Post One
issueRouter.post("/", (req, res, next) => {
    const newIssue = new Issue(req.body)
    newIssue.date = new Date
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

//Delete One
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete({_id: req.params.issueId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database.`)
    })
})

//Update One
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate({_id: req.params.issueId}, req.body, {new: true}, (err, updatedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedIssue)
    })
})

module.exports = issueRouter