'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, pagination }) {
    const username = request.input('username')
    const query = User.query()
    if (username) {
      query.where('username', 'LIKE', `%${username}%`)
      query.orWhere('email', 'LIKE', `%${username}%`)
    }
    const usernames = await query.paginate(pagination.page, pagination.limit)
    return response.send(usernames)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const userData = request.only([
        username,
        email,
        password,
        image_id
      ])
      const user = await User.create(userData)
      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({
        message: "Erro ao efetuar o cadastro!"
      })     
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id}, request, response }) {
    const user = await User.findOrFail(id)
    return response.send(user)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: {id}, request, response }) {
    const user = await User.findOrFail(id)
    try {
      const userData = require.only([
        username,
        email,
        password,
        image_id
      ])
      user.merge(userData)
      await user.save()
      return response.send(user)        
    } catch (error) {
      return response.status(400).send({
        message: 'Erro ao alterar o cadastro!'
      })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: {id}, request, response }) {
    const user = await User.findOrFail(id)
    try {
      await user.delete()
      return response.status(204).send()  
    } catch (error) {
      return response.status(500).send({
        message: 'Erro ao excluir o cadastro!'
      })
    }
  }
}

module.exports = UserController
