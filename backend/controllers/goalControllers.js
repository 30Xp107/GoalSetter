const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')

//@desc Get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

//@desc Set goals
//@route POST /api/goals
//@access private  
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})

//@desc Update goal
//@route PUT /api/goals
//@access private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

//@desc Delete goal
//@route DELETE /api/goals 
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const deletedGoal = await Goal.findByIdAndRemove(req.params.id, {
        new: true,
    })

    res.status(200).json(deletedGoal)
}) 

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} 