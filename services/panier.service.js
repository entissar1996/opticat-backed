const Panier = require('../db/models/panier-schema');
const User = require('../db/models/user-schema');

async function CalculPrixTotal(panier) {

}

async function addPanier(panier) {
    try {
        let NewPanier = await Panier.create(panier);
        await addUserToPanier(NewPanier);

        return ({    
            status: "success",
            message: "Panier added succssfullty", 
            payload:  NewPanier
        });

    } catch (error) {
        return ({ 
            status: "failed",
            message: "Add Panier failed", 
            payload: error 
        });
    }

}
async function addUserToPanier(panier)
{
    await User.updateMany(
        { '_id':panier.idUser }, 
        { $push: {  paniers: panier._id } }
        );
}
async function getAllPanier(userId) {
    try {
        let listePaniers = await Panier.find({idUser:userId}).populate("idOrder");
        return ({
            status: "success",
            message: "All panisers", 
            payload: listePaniers 
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All panier Fail", 
            payload: error 
        });
    }
}

async function getOnePanier(id){
  
   try {
        let panier = await Panier.findById({_id:id});
        return ({
            status: "success",
            message: `Get panier with _id=${id}`,
            payload: panier 
        });

    } catch (error) {
        return {
            status: "error",
            message: `Error to get panier with _id=${id}`,
            payload: error,
          };
    }
}

async function updatePanier(id,panier) {
  
    try {
        let oldPanier = await Panier.findByIdAndUpdate(id, panier);
        let updatedPanier = await Product.findById(id);
        await DelatePanierToUser (oldPanier);
        await addUserToPanier(updatedPanier);
        return ({
            status: "success",
            message: "Panier updated successfully",
            payload: await Panier.findById(id),
        });
    } catch (error) {
        return ({ 
            status: "error",
             message: `Error to delete panier with _id=${id}`, 
            payload: error 
        });
    }

}

async function DeletePanier(id) {
  
    try {
        let oldpanier = await Panier.findById(id);
        let deletedPanier = await Panier.deleteOne({_id:id});
        await DelatePanierToUser(oldpanier);
        return ({ 
            status: "success",
            message: `Panier with _id=${id} has deleted`,
           payload: deletedPanier 
        });

    } catch (error) {
        return ({ message:  `Error to delete Panier with _id=${id}`, payload: error });
    }

}
async function DelatePanierToUser(panier)
{
    await User.updateMany(
        { '_id':panier.idUser }, 
        { $pull : {  paniers: panier._id } }
        );
}
module.exports =() => {
    return (
        {
            addPanier: addPanier,
            getAllPanier: getAllPanier,
            getOnePanier: getOnePanier,
            updatePanier: updatePanier,
            DeletePanier:  DeletePanier
        });
}