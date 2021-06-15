 const router=require('express').Router();
 const productService= require('../services/product.service')();
 var multer  = require('multer');
 const Product=require ('../db/models/product-schema')
 const photo=require('../routes/picture')
 
 router.post('/',async function(req, res, next){
  let {...product} = req.body
    let response = await productService.addProduct(product);
    res.json(response);
})

 router.get('/',async function(req,res,next){
    let result=await productService.getAllProducts();
    res.json(result);
 })

 router.post('/addCategory/:id',async function(req,res){
   let id = req.params.id;

    let result = await productService.addCategorysToProduct(id,req.body);
    res.json(result);
 })
 

 router.get('/:id', async function(req,res)
 {
   let id=req.params.id;
   let response = await productService.getOneProduct(id);
   res.json(response);

 })

 router.put('/:id', async function(req,res)
 {
  let id = req.params.id;
  let {...product} = req.body
  let response = await productService.updateProduct(id,product);
   res.json(response);
   

 })
 router.delete('/:id', async function(req,res)
 {
   let id=req.params.id;
   let response = await productService.DeleteProduct(id);
   res.json(response);

 })

 module.exports=router;   