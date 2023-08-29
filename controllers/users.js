const Users = require('../models/usuarios')

const obtenerUsuarios = async (req, res) => {

    const body = req.body;

    try {
       const usuarios = await Users.find({});
       res.send({usuarios});

    } catch (ex) {
        res.status("405");
        res.status({error: "error al procesar: "+ex})
    }


}

const usuariosInicio = async (req, res) => {
    const { nombre, telefono, email, id } = req.body;

    const newUsuario = new Users({ nombre, telefono, email, id });

    await newUsuario.save();

    res.status(200).json({
        msg: 'Usuario agregado exitosamente',
        newUsuario,
    })

};

const registroUsuarios = async (req, res) => {
    const { nombre, telefono, email, id } = req.body;
    try{
        const existingUser = await Users.findOne({ email }); // Buscar si el email ya existe en la base de datos
        if (existingUser) {
            return res.status(400).json({
                error: 'El email ya está registrado',
            });
        }
        const newUsuario = new Users({ nombre, telefono, email, id });
        await newUsuario.save();

        res.status(200).json({
            msg: 'Usuario registrado exitosamente',
            newUsuario,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al registrar el usuario',
        });
    }
};


const borrarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Users.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado',
            });
        }
        res.status(200).json({
            msg: 'Usuario eliminado exitosamente',
            usuario,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el usuario',
        });
    }
};

module.exports = {
    usuariosInicio,
    registroUsuarios,
    borrarUsuario,
    obtenerUsuarios
};


