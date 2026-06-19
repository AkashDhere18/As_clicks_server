const cloudinary = require('../Config/cloudinary')

const getGallaryImages = async (req,res)=>{
    try {
        const folder = req.params.folder;

        const result = await cloudinary.search
           .expression(`folder=photography/${folder}`)
           .sort_by("created_at", "desc")
           .max_results(100)
           .execute()


        if(!result){
            res.status(200).send({msg:"Data not found"})
        }   

        res.status(200).json(result.resources)   



    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"server error",success:false})
    }
}

module.exports = {getGallaryImages}