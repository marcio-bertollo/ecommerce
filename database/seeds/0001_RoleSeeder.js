'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('Role')

class RoleSeeder {
  async run () {
    // cria o admin
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema!'
    })

    // cria o cargo de gerente
    await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'Gerente da loja'
    })

    // criar o cargo de cliente
    await Role.create({
      name: 'Client',
      slug: 'client',
      description: 'Cliente da loja'
    })
  }
}

module.exports = RoleSeeder
