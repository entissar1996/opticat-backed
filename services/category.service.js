const Category = require('../db/models/category-schema');

async function addCategory(category) {
    try {
        let NewCategory = await Category.create(category);
        return ({    
            status: "success",
            message: "Category added succssfullty", 
            payload: NewCategory
        });

    } catch (error) {
        return ({ 
            status: "failed",
            message: "Add Category failed", 
            payload: error 
        });
    }

}

async function getAllCategory() {
    try {
        let listeCategorys = await Category.find().populate("products");
        return ({
            status: "success",
            message: "All categorys", 
            payload: listeCategorys 
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Categorys Fail", 
            payload: error 
        });
    }
}

async function getOneCategory(id){
  
   try {
        let category = await Category.findById({_id:id}).populate("products","-_id -__v -categories");
        return ({
            status: "success",
            message: `Get category with _id=${id}`,
            payload: category 
        });

    } catch (error) {
        return {
            status: "error",
            message: `Error to get category with _id=${id}`,
            payload: error,
          };
    }
}

async function updateCategory(id,category) {
  
    try {
        let updatedCategory = await Category.findByIdAndUpdate(id, category);
        return ({
            status: "success",
            message: "category updated successfully",
            payload: await Category.findById(id),
        });
    } catch (error) {
        return ({ 
            status: "error",
             message: `Error to delete category with _id=${id}`, 
            payload: error 
        });
    }

}

async function DeleteCategory(id) {
  
    try {
        let deletedCategory = await Category.deleteOne({_id:id});
        return ({ 
            status: "success",
            message: `Category with _id=${id} has deleted`,
           payload: deletedCategory 
        });

    } catch (error) {
        return ({ message:  `Error to delete Category with _id=${id}`, payload: error });
    }

}
module.exports =() => {
    return (
        {
            addCategory: addCategory,
            getAllCategory: getAllCategory,
            getOneCategory: getOneCategory,
            updateCategory: updateCategory,
            DeleteCategory:  DeleteCategory
        });
}