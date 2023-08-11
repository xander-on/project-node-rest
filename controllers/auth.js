const { response } = require("express");
const User         = require('../models/user');
const bycryptjs    = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        //verificar si el email existe
        if( !user ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }

        //si el usuario esta activo
        if( !user.state ){
            return res.status(400).json({
                msg:'Usuario no se encuentra activo'
            });
        }

        //verificar la contrasena
        const validPassword = bycryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }

        //generar el jwt
        const token = await generarJWT( user.id );

        res.json({user, token});

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
}



const googleSignIn = async( req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if( !user ){

            const data = {
                name,
                email,
                password: ':P',
                img,
                google:true,
                role: 'USER_ROLE'
            };

            user = new User( data ),
            await user.save();
        }


        // si el usuario en db status = false
        if( !user.state ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //generar el jwt
        const token = await generarJWT( user.id );

        res.json({ user, token });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
    }
}


module.exports = {
    login,
    googleSignIn
}
