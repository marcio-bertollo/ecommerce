'use strict'

//const Factory = require('@adonisjs/lucid/src/Factory')

/*
|--------------------------------------------------------------------------
| Fábrica
|--------------------------------------------------------------------------
|
| As fábricas são usadas para definir projetos para tabelas de banco de dados ou Lucid
| modelos. Mais tarde, você pode usar esses projetos para propagar seu banco de dados
| com dados fictícios.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
return {
    username: faker.username(),
    email: faker.email(),
    password: 'secret'
}
})

Factory.blueprint('App/Models/Category', faker => {
    return {
        title: faker.country({ full: true }),
        description: faker.sentence()
    }
})

Factory.blueprint('App/Models/Product', faker => {
    return {
        name: faker.animal(),
        description: faker.sentence(),
        price: faker.floating({ min: 0, max: 1000, fixed: 2})
    }
})
