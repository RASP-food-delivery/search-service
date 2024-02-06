const Menu = require("../db/models/itemModel");
const Vendor = require("../db/models/vendorModel");

module.exports.getQuery = async (req, res)=> {
    const search = req.body.query;
    const agg1 = [
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
    const agg2 = [
        {
          $search: {
            index: "restaurantnames",
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
            resId : "$_id",
          }
        }
      ];
      try{
          const searchResult1 = await Menu.aggregate(agg1);
          const searchResult2 = await Vendor.aggregate(agg2);
          const combinedResults = [...searchResult1, ...searchResult2];
          res.status(200).json(combinedResults);
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