const { compareSync } = require('bcrypt');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const product = require('../db/models/product-schema');





const storage = multer.diskStorage({ //multers disk storage settings
    destination: async function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: async function(req, file, cb) {
        const productId = req.params.id;
        const path = file.fieldname + '-' + Date.now() + '-' + productId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, path);

        try{

            await updatePicture(productId, path)
                 .then(function(value) {
                    return value;
                 })
                 .catch(function(err) {
                    return err;
                 });
        }catch(err){
            return err;
        }
    }
});

var upload = multer({ //multer settings
    storage: storage
}).any('picture');

async function updatePicture(id, path) {
   
    await product.findByIdAndUpdate({ _id: id }, { $set: { photo: path } })
    .then(function(doc) {
        return doc.name + ': ' + doc.message;
    }).catch(function(error){
        return error.name + ': ' + error.message
    });
}

router.post('/picture/:id', upload, async function(req, res, next) {
   upload(req, res,async function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
        }
        res.json({ error_code: 0, err_desc: 'Picture successfully uploaded' });
    });
});

module.exports = router;