module.exports = (app) => {
    const products = require('./product.controller');

    app.post('/products', products.create);

    app.get('/products', products.findAll);

    app.get('/products/:productId', products.findOne);

    app.put('/products/:productId', products.update);

    app.delete('/product/:productId', products.delete);
}