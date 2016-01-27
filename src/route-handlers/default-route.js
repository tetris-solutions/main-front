import render from '../render'

export default (req, res) => res.send(render(req.path))
