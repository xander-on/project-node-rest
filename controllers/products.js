const { response } = require("express");
const { Product } = require("../models/");


const getProducts = async( req, res = response ) =>{
    const { limite= 5, desde= 0 } = req.query;
    const query = { state: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.json({
        total,
        products
    });
}


const getProductById = async( req, res = response) =>{
    const { id } = req.params;
    const product = await Product.findById( id )
        .populate('user', 'name')
        .populate('category', 'name');

    res.json( product );
}


const createProduct = async( req, res = response) => {
    const { state, user, ...body} = req.body;

    const productDB = await Product.findOne({ name:body.name.toUpperCase() });

    if( productDB ) {
        return res.status(400).json({
            msg: `El product ${ productDB.name }, ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product( data );

    //Guardar DB
    await product.save();

    res.status(201).json( product );
}


const updateProduct = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if ( data.usuario )  data.name = data.name.toUpperCase();

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, { new:true } );

    res.json( product );
}


const deleteProduct = async( req, res = response ) =>{

    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndUpdate( id, {state:false}, {new:true});

    res.json( deletedProduct );
}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
