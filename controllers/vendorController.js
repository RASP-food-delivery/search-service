const Vendor = require("../db/models/vendorModel")

module.exports.getRestaurants = async (req, res)=> {
    Vendor.find({}).then( (docs) => {
        res.status(200).send(docs)
    }
    ).catch((error) => {
        res.status(400).send({
            message: "Could not get restaurants.",
            error: error
        }
        )
    })
}