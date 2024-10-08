const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


//get all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({eror: 'no such workout'})
    }
    res.status(200).json(workout)
}


//create new workout
const createWorkout = async (req, res) => {
    const {title, artist, album, genre} = req.body

let emptyFields = []
if(!title) {
    emptyFields.push('title')
}
if(!artist) {
    emptyFields.push('load')
}
if(!album) {
    emptyFields.push('album')
}
if(!genre) {
    emptyFields.push('genre')
}
if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'please fill in all the field', emptyFields })
}


// add doc to db
    try {
       const workout = await Workout.create({title, artist, album, genre})
       res.status(200).json(workout) 
    } catch (error) {
     res.status(400).json({error: error.message})  
    }
}



//delete workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id}) 

    if (!workout) {
        return res.status(400).json({eror: 'no such workout'})
    }
res.status(200).json(workout)
}



//update workout

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({eror: 'no such workout'})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout, 
    updateWorkout
}