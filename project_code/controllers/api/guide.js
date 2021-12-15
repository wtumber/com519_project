const Guides = require("../../models/Guide");

exports.list = async (req, res) => {

    const searchQuery = req.query.search;

    if (!searchQuery) {
        res.json([]);
    }

    try {
        const Result =  await Guides.find(
            { $text: { $search: searchQuery }},
            { score: { $meta: "textScore" } }
         ).sort( { score: { $meta: "textScore" } } ).limit(50)
        res.json(Result);
    } catch (e) {
        console.log(e);
        res.status(404).send({
            message: `Search failure @ /api/guide.js`,
        });
    }
  };
