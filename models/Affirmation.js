import mongoose from 'mongoose'

const affirmationSchema = new mongoose.Schema({
    data:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
    },
},{
    timestamps: true,
})

const AffirmationModel = mongoose.model('Affirmation', affirmationSchema)

export default AffirmationModel
