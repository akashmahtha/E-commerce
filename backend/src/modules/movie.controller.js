import Movie from "../models/movie.model.js";

 export const getMovie=async(req,res)=>{
    try{
        const movies=await Movie.find().limit(5);
            res.status(200).json({
                success:true,
                movieData:movies
            })
    }

    catch(error){
        res.status(500).json({
            success:false,
            movieData:error.message
        })
    }

}