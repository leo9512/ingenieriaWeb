let express = require('express');
let status = require('http-status');

module.exports = function (wagner) {

  let api = express.Router();

  api.post('/addToCart', wagner.invoke(function(Client, Cart) {
    return function(req, res) {
        let idClient = req.body.idClient;
        let idProduct = req.body.idProduct;
        Cart.findOne({client: idClient}).exec(function(err, cart) {
            if (cart) {
              Cart.findOneAndUpdate({client: idClient},{$push: {product: idProduct}}, function(error) {
                    if (error) {
                        return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({
                                error: error.toString()
                            });
                    }

                    let content = {
                        message: 'El producto se agregó correctamente'
                    };
                    res.json(content);
                });
            } else {
                let cart = {"client": idClient,"product": idProduct};
                Cart(cart).save(function(error) {
                        if (error) {
                            return res
                                .status(status.INTERNAL_SERVER_ERROR)
                                .json({error: error.toString()});
                        }
                        let content = { message: 'El carro se ha inicializado'};
                        res.json(content);
                });
            }
        })
    }
}));

    api.post('/registerClient', wagner.invoke(function(Client){
      return function(req, res) {
        let reqClient= req.body;
        Client(reqClient).save(function(error) {
          if(error) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json({error: error.toString()});
          }
          let content = { message: 'Se registró exitosamente el cliente'};
          res.json(content);
        })

      }
    }));

  return api;
}
