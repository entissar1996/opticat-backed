const { compareSync } = require('bcrypt');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const marque = require('../db/models/marque-schema');





const storage = multer.diskStorage({ //multers disk storage settings
    destination: async function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: async function(req, file, cb) {
        const marqueId = req.params.id;
        const path = file.fieldname + '-' + Date.now() + '-' + marqueId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, path);

        try{

            await updatePicture(marqueId, path)
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
}).any('picturemarque');

async function updatePicture(id, path) {
   
    await marque.findByIdAndUpdate({ _id: id }, { $set: { logo: path } })
    .then(function(doc) {
        return doc.name + ': ' + doc.message;
    }).catch(function(error){
        return error.name + ': ' + error.message
    });
}

router.post('/picturemarque/:id', upload, async function(req, res, next) {
   upload(req, res,async function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
        }
        res.json({ error_code: 0, err_desc: 'Picture successfully uploaded' });
    });
});

module.exports = router;