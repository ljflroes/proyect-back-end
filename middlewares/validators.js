const { validationResult } = require('express-validator');
const Users = require('../models/usuarios');
 

const validarCampos = (req, res, next) => {
  
  /* if (!nombre || !telefono || !email || !mensaje) {
      const error = document.createElement('div');
      error.innerText = 'Por favor completa los datos';
      formulario.appendChild(error);
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  */

  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() })
  }
};

module.exports = validarCampos;