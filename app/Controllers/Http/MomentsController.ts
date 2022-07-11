import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application'
import { v4 } from 'uuid'

export default class MomentsController {
  private validatonRules = {
    types: 'image',
    size: '5mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const momentData = request.body()
    const image = request.file('image', this.validatonRules)

    if (image) {
      const imageName = `${v4()}.${image.extname}`
      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      momentData.image = imageName
    }

    const results = await Moment.create(momentData)
    response.status(201)

    return {
      message: 'Moment created.',
      insertedMoment: results,
    }
  }

  public async index() {
    const moments = await Moment.all()

    return moments
  }

  public async show({ params }: HttpContextContract) {
    const id = params.id
    const moment = await Moment.findOrFail(id)

    return moment
  }

  public async destroy({ params }: HttpContextContract) {
    const id = params.id

    const moment = await Moment.findOrFail(id)
    await moment.delete()

    return {
      message: 'Moment deleted',
      data: moment,
    }
  }
}
