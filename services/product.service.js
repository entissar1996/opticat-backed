const Product= require('../db/models/product-schema');
const Category= require('../db/models/category-schema');
const Marque = require('../db/models/marque-schema');

async function addProduct(product) {

    try {
        let NewProduct = await Product.create(product);

        await addCategoryToProduct(NewProduct);
        await addMarqueToProduct(NewProduct);
        
        return ({    
                status: "success",
                message: "Product added succssfullty", 
                payload: NewProduct
            });

    } catch (error) {
        return ({ 
                status: "failed",
                message: "Add Product failed", 
                payload: error

            });
    }

}
async function addCategoryToProduct(product)
{
    await Category.updateMany(
        { '_id':product.categories }, 
        { $push: { products: product._id } }
        );
}
async function addMarqueToProduct(product)
{
    await Marque.updateMany(
        { '_id':product.brand }, 
        { $push: { products: product._id } }
        );
}



async function getAllProducts() {
    try {
        let listeProducts = await Product.find().populate("brand");
        return ({
            status: "success",
            message: "All Products", 
            payload: listeProducts 
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Productns Fail", 
            payload: null
        });
    }
}


async function getOneProduct(id){
    try {
        let listeProducts = await Product.findById(id)
        //.populate("categories", "-_id -__v -products");
        return ({
            status: "success",
            message: "All Products", 
            payload: listeProducts 
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Productns Fail", 
            payload: null
        });
    }

}

async function updateProduct(id,product) {
  
    try {
        let oldproduct = await Product.findByIdAndUpdate(id, product);
        let updatedProduct = await Product.findById(id);
        //update product to catégorie
        await DelateCategoryToProduct(oldproduct);
        await addCategoryToProduct(updatedProduct);
       //update product to marque
       await DelateMarqueToProduct(oldproduct);
       await addMarqueToProduct(updatedProduct);
       // await Category.updateMany({ '_id': updatedProduct.categories }, { $addToSet: { products: updatedProduct._id } });
     
        return ({
            status: "success",
            message: "Product updated successfully",
            payload: updatedProduct, 
        });
    }
    catch (error) {
        return {
              status: "error",
              message: "update product is failed",
              payload: error,
        };
    }

}



 


async function DeleteProduct(id) {
  
    try {
        let oldProduct = await Product.findById(id);
        console.log(oldProduct )
        let deletedProduct = await Product.deleteOne({_id:id});
        //await Category.updateMany({ '_id': deletedProduct.categories }, { $pull: { products: deletedProduct._id } });
        await DelateCategoryToProduct(oldProduct);
        await DelateMarqueToProduct(oldProduct);
        return ({ 
            status: "success",
            message: `User with _id=${id} has deleted`,
           payload: deletedProduct 
        });

    } catch (error) {
        return ({ 
            status: "error",
             message: `Error to delete user with _id=${id}`, 
            payload: error });
    }

}
async function DelateCategoryToProduct(product)
{

    await Category.updateMany(
        { '_id':product.categories }, 
        { $pull : { products: product._id } }
        );
}
async function DelateMarqueToProduct(product)
{
    await Marque.updateMany(
        { '_id':product.brand }, 
        { $pull : { products: product._id } }
        );
}
//async function uploadPhoto()
module.exports =() => {
    return (
        {
            addProduct: addProduct, 
            getAllProducts: getAllProducts,
            getOneProduct: getOneProduct,
            updateProduct: updateProduct,
            DeleteProduct:  DeleteProduct
        }
    );
}