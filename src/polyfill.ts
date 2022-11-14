import 'reflect-metadata'
import ModuleAlias from 'module-alias'

(function setupAlias() {
  ModuleAlias.addAlias('@apps', __dirname + '/apps')
  ModuleAlias.addAlias('@cores', __dirname + '/cores')
  ModuleAlias.addAlias('@libs', __dirname + '/libs')
})()
