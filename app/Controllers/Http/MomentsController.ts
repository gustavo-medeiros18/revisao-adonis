import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'

export default class MomentsController {
  public async store({ request, response }: HttpContextContract) {
    const momentData = request.body()
    const results = await Moment.create(momentData)

    response.status(201)

    return {
      message: 'Moment created.',
      insertedMoment: results,
    }
  }
}
