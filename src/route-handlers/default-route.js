import render from '../functions/server-render-route'
import Tree from 'baobab'

export default (req, res) =>
  res.send(render(req.path,
    req.tree || new Tree({user: null})))
