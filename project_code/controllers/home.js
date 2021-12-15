const Guides = require("../models/Guide");
const Languages = require("../models/Language");
const Formats = require("../models/Format");
const Recommenders = require("../models/Recommender");

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        const activeRecommender = await Recommenders.find({}
            ).sort({num_reviews: -1}).limit(1)
        console.log(activeRecommender) 

        
        const interactiveFormat = await Formats.findOne({content_format: "tutorial"})
        console.log(interactiveFormat._id)
        const formatId = interactiveFormat._id

        const popularInteractiveNameRef = await Guides.aggregate([
            { $match: {format_id: formatId}},
            { $group: {
                _id: "$title",
                num_reviews: {$sum: 1}, 
                },
            },
        ]).sort({num_reviews: -1}).limit(1)
        const popularInteractiveName = popularInteractiveNameRef[0]._id;
        console.log(popularInteractiveNameRef[0]._id)

        const popularInteractive = await Guides.findOne({title: popularInteractiveName})

        console.log(popularInteractive)
        //
        

        
        const popularLanguage = await Guides.aggregate([
            { $group: { 
                _id: "$language_id",
                num_reviews: {$sum: 1} 
                } 
            }
        ])
        console.log(popularLanguage)

           

        


        
        res.render(
            "index",
            {
                popularLanguage: popularLanguage,
                activeRecommender: activeRecommender[0],
                popularInteractive: popularInteractive,
                popularInteractiveRecs: popularInteractiveNameRef[0].num_reviews

            }

        )
    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }

    // Most popular language
    


}