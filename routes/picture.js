const express = require('express');
const multer = require('multer');
const Q = require('q');
const router = express.Router();
const product = require('../db/models/product-schema');





var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        console.log(req.body.id);
        var productId = req.body.id;
        var path = file.fieldname + '-' + Date.now() + '-' + productId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, path);

        updatePicture(productId, path)
            .then(function() {
                res.sendStatus(200);
            })
            .catch(function(err) {
                res.status(400).send(err);
            });
    }
});

var upload = multer({ //multer settings
    storage: storage
}).any('picture');

function updatePicture(id, path) {
    var deferred = Q.defer();
    product.findByIdAndUpdate({ _id: id }, { $set: { picture: path } },
        function(err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });
    return deferred.promise;
}

router.post('/picture', upload, function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: 'Picture successfully uploaded' });
    });
});

module.exports = router;