const router=require('express').Router();
const  panierService= require('../services/panier.service')();

 router.get('/',async function(req,res){
    let result=await panierService.getAllPanier();
    res.json(result);
 })

 router.post('/',async function(req,res){
   
     let result = await panierService.addPanier(req.body);
     res.json(result);
 })
 

 router.get('/:id', async function(req,res)
 {
   let response = await panierService.getOnePanier(req.params.id);
   res.json(response);

 })

 router.put('/:id', async function(req,res)
 { 
  let response = await panierService.updatePanier(req.params.id,req.body);
   res.json(response);

 })
 router.delete('/:id', async function(req,res)
 {
   let response = await panierService.DeletePanier(req.params.id);
   res.json(response);

 })

 module.exports=router;   