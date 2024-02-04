const Menu = require("../db/models/itemModel");
const Vendor = require("../db/models/vendorModel");

module.exports.getQuery = async (req, res)=> {
    const search = req.body.query;
    const agg = [
        {
          $search: {
            index: "restaurantsandfood",
            text: {
              query: search,
              path: {
                wildcard: "*"
              },
            }
          }
        },
        {
          $project :{
            resId : 1,
          }
        }
      ];
      try{
          const searchResult = await Menu.aggregate(agg);
          res.status(200).json(searchResult);
      }catch(error){
            throw(error)
      }
}

module.exports.getRestaurants = async (req, res)=> {
  const search = req.body.restaurants;
  
  const input = search.map((restaurant)=>{
    return restaurant.resId;
  });

  await Vendor.find( { _id: { $in: input } }).
  then((result) => {
    return res.status(200).json(result);
  }).catch((error)=>
  {
    return res.status(400).send(error)
  }
  )
}