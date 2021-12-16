const Guides = require("../models/Guide");
const Languages = require("../models/Language");
const Formats = require("../models/Format");
const Recommenders = require("../models/Recommender");
const Language = require("../models/Language");

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        const activeRecommender = await Recommenders.find({}
            ).sort({num_reviews: -1}).limit(1)


        
        const interactiveFormat = await Formats.findOne({content_format: "tutorial"})

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

        const popularInteractive = await Guides.findOne({title: popularInteractiveName})

        
        const popularLanguageRef = await Guides.aggregate([
            { $group: { 
                _id: "$language_id",
                num_reviews: {$sum: 1} 
                } 
            }
        ]).sort({num_reviews: -1}).limit(1)

        const popularLanguageId = popularLanguageRef[0]
        const popularLanguage = await Language.findById({_id:popularLanguageId._id})

        res.render(
            "index",
            {
                popularLanguageReviews: popularLanguageRef[0],
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