const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const collectionsAllowed = [
    'users',
    'categories',
    'products',
    'roles',
];


const searchUsers = async( query='', res = response) => {

    const isMongoID = ObjectId.isValid( query ); // True

    if( isMongoID ){
        const user = await User.findById( query );
        return res.json({
            results: user ? [ user ] : []
        });
    }

    const regex = new RegExp( query, 'i');

    const users = await User.find({
        $or: [ { name:regex }, { email:regex } ],
        $and: [{ state:true }]
    });

    res.json({
        results:users
    });
}


const searchCategories = async( query='', res = response) => {

    const isMongoID = ObjectId.isValid( query ); // True

    if( isMongoID ){
        const category = await Category.findById( query );
        return res.json({
            results: category ? [ category ] : []
        });
    }

    const regex = new RegExp( query, 'i');
    const categories = await Category.find({ name:regex, state:true });

    res.json({
        results:categories
    });
}


const searchProducts = async( query='', res = response) => {

    const isMongoID = ObjectId.isValid( query ); // True

    if( isMongoID ){
        const product = await Product.findById( query ).populate('category', 'name');
        return res.json({
            results: product ? [ product ] : []
        });
    }

    const regex = new RegExp( query, 'i');
    const products = await Product.find({ name:regex, state:true }).populate('category', 'name');

    res.json({
        results:products
    });
}



const search = ( req, res = response ) => {

    const { collection, query } = req.params;

    if( !collectionsAllowed.includes(collection) ){
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${collectionsAllowed}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(query, res);
            break;

        case 'categories' :
            searchCategories(query, res);
            break;

        case 'products':
            searchProducts(query, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
            break;
    }
}


module.exports = {
    search
};
