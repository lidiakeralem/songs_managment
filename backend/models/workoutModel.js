const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
    type: String,
    required: true
 },
 album: {
    type: String,
    required: true
 },
 genre: {
   type: String,
   required: true
}
}, {timestamps: true})

module.exports = mongoose.model('workout', workoutSchema)

