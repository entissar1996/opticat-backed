const router=require('express').Router();
const  orderService= require('../services/order.service')();

 router.get('/',async function(req,res){
    let result=await orderService.getAllOrder();
    res.json(result);
 })

 router.post('/',async function(req,res){
   
     let result = await orderService.addOrder(req.body);
     res.json(result);
 })
 

 router.get('/:id', async function(req,res)
 {
   let response = await orderService.getOneOrder(req.params.id);
   res.json(response);

 })



 module.exports=router;   