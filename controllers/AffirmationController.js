import AffirmationModel from "../models/Affirmation.js";


export const evaluateData = async (req, res) => {
    try {
        const type = req.body.type
        const rate = type === 'inc' ? 1 : type === 'dec' ? -1 : {}

        const data = await AffirmationModel.findByIdAndUpdate(
            {_id: req.body.id},
            {$inc: {rating: rate}},
            {returnDocument: "after"}
        )

        if (data) {
            res.json(data)
        } else {
            res.status(403).send("Something wrong")
            console.log(req.body.type)
        }

    } catch (e) {
        console.log(e)
    }

}

export const getDataByType = async (req, res) => {
    try {
        const type = req.query.type
        const data = await AffirmationModel
            .aggregate([
                {$match: {type: `${type}`}},
                {$sample: {size: 1}}
            ])

        if (!data || data.length === 0) {
            res.status(404).send('Not found')
        } else {
            res.status(200).json(data)
        }
    } catch (e) {
        console.log(e)
    }
}
