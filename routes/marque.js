const router=require('express').Router();
const  marqueService= require('../services/marque.service')();

 router.get('/',async function(req,res){
    let result=await marqueService.getAllMarque();
    res.json(result);
 })

 router.post('/',async function(req,res){
   
     let result = await marqueService.addMarque(req.body);
     res.json(result);
 })
 

 router.get('/:id', async function(req,res)
 {
   let response = await marqueService.getOneMarque(req.params.id);
   res.json(response);

 })

 router.put('/:id', async function(req,res)
 { 
  let response = await marqueService.updateMarque(req.params.id,req.body);
   res.json(response);

 })
 router.delete('/:id', async function(req,res)
 {
   let response = await marqueService.DeleteMarque(req.params.id);
   res.json(response);

 })

 module.exports=router;   