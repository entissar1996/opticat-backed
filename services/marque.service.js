const Marque = require('../db/models/marque-schema');

async function addMarque(marque) {
    try {
        let NewMarque = await Marque.create(marque);
        return ({    
            status: "success",
            message: "Marque added succssfullty", 
            payload: NewMarque
        });

    } catch (error) {
        return ({ 
            status: "failed",
            message: "Add Marque failed", 
            payload: error 
        });
    }

}

async function getAllMarque() {
    try {
        let listeMarques = await Marque.find().populate("products","-_id -__v -marque");
        return ({
            status: "success",
            message: "All marques", 
            payload: listeMarques 
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Marques Fail", 
            payload: error 
        });
    }
}

async function getOneMarque(id){
  
   try {
        let marque = await Marque.findById({_id:id}).populate("products","-_id -__v -marques");
        return ({
            status: "success",
            message: `Get marque with _id=${id}`,
            payload: marque 
        });

    } catch (error) {
        return {
            status: "error",
            message: `Error to get marque with _id=${id}`,
            payload: error,
          };
    }
}

async function updateMarque(id,marque) {
  
    try {
        let updatedMarque = await Marque.findByIdAndUpdate(id, marque);
        return ({
            status: "success",
            message: "marque updated successfully",
            payload: await Marque.findById(id),
        });
    } catch (error) {
        return ({ 
            status: "error",
             message: `Error to delete marque with _id=${id}`, 
            payload: error 
        });
    }

}

async function DeleteMarque(id) {
  
    try {
        let deletedMarque = await Marque.deleteOne({_id:id});
        return ({ 
            status: "success",
            message: `Marque with _id=${id} has deleted`,
           payload: deletedMarque 
        });

    } catch (error) {
        return ({ 
            message:  `Error to delete Marque with _id=${id}`,
             payload: error });
    }

}
module.exports =() => {
    return (
        {
            addMarque: addMarque,
            getAllMarque: getAllMarque,
            getOneMarque: getOneMarque,
            updateMarque: updateMarque,
            DeleteMarque:  DeleteMarque
        });
}