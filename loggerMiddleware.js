/**
 * MIDDLEWARE EN EXPRESS
 * códigos que se ejecutan antes de que una petición HTTP
 * llegue al manejador de rutas o antes de que un cliente reciba una respuesta
 * si no se le indica con el next, se quedara en el middleware hasta que reciba una respuesta
 * con el next pasa al siguiente middleware que cumpla con el path
 */

const logger = (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('----------')
  next()
}

export default logger
