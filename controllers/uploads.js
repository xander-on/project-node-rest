const path = require('path');
const fs   = require('fs');
const { response }     = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const {User, Product } = require('../models');

const cloudinary       = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const loadFile = async(req, res = response) => {

    try {
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const updateImage = async( req, res=response ) => {

    const { id, collection } = req.params;

    let model;

    switch( collection ){
        case 'users':
            model = await User.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    //limpiar imagenes previas
    if( model.img ){
        const pathImage = path.join(__dirname, '../uploads', collection, model.img );
        if( fs.existsSync(pathImage) ){
            fs.unlinkSync(pathImage);
        }
    }


    const nombre = await subirArchivo( req.files, undefined, collection );
    model.img = nombre;

    await model.save();

    res.json( model );
}


const updateImageCloudinary = async( req, res=response ) => {

    const { id, collection } = req.params;

    let model;

    switch( collection ){
        case 'users':
            model = await User.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    //limpiar imagenes previas
    if( model.img ){
        const nombreArr = model.img.split('/');
        const nombre = nombreArr[ nombreArr.length -1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( `cafe-app/${collection}/${public_id}` );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { folder: `cafe-app/${collection}`} );
    model.img = secure_url;
    await model.save();

    res.json( model );
}



const showImage = async( req, res=response ) => {

    const { id, collection } = req.params;

    let model;

    switch( collection ){
        case 'users':
            model = await User.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }


    if( model.img ){
        const pathImage = path.join(__dirname, '../uploads', collection, model.img );
        if( fs.existsSync(pathImage) ){
            return res.sendFile( pathImage )
        }
    }

    const pathImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile( pathImage );

}


module.exports = {
    loadFile,
    updateImage,
    updateImageCloudinary,
    showImage
};
