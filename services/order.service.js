const Order = require('../db/models/order-schema');

async function addOrder(order) {
    try {
        let NewOrder = await Order.create(order);
        return ({    
            status: "success",
            message: "Order added succssfullty", 
            payload: NewOrder
        });

    } catch (error) {
        return ({ 
            status: "failed",
            message: "Add Order failed", 
            payload: error 
        });
    }

}

async function getAllOrder() {
    try {
        let listeOrder = await Order.find();
        return ({
            status: "success",
            message: "All order", 
            payload: listeOrder 
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Order Fail", 
            payload: error 
        });
    }
}

async function getOneOrder(id){
  
   try {
        let order = await Order.findById({_id:id});
        return ({
            status: "success",
            message: `Get order with _id=${id}`,
            payload: order 
        });

    } catch (error) {
        return {
            status: "error",
            message: `Error to get order with _id=${id}`,
            payload: error,
          };
    }
}




module.exports =() => {
    return (
        {
            addOrder: addOrder,
            getAllOrder: getAllOrder,
            getOneOrder: getOneOrder
        });
}