import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Comment from 'App/Models/Comment'

export default class CommentsController {
  public async store({ request, params, response }: HttpContextContract) {
    const commentData = request.body()
    const momentId = params.momentId

    await Moment.findOrFail(momentId)

    commentData.momentId = momentId
    const insertedComment = await Comment.create(commentData)

    response.status(201)
    return {
      message: 'Comment created',
      insertedComment: insertedComment,
    }
  }

  public async index({ params }: HttpContextContract) {
    const momentId = params.momentId
    await Moment.findOrFail(momentId)

    const comments = await Comment.query().where('momentId', '=', momentId)
    return comments
  }

  public async show({ params }: HttpContextContract) {
    const momentId = params.momentId
    await Moment.findOrFail(momentId)

    const commentId = params.commentId
    const comment = await Comment.findOrFail(commentId)

    return comment
  }

  public async update({ params, request }: HttpContextContract) {
    const momentId = params.momentId
    await Moment.findOrFail(momentId)

    const commentId = params.commentId
    const existentComment = await Comment.findOrFail(commentId)
    const newCommentData = request.body()

    existentComment.username = newCommentData.username
    existentComment.text = newCommentData.text

    await existentComment.save()

    return {
      message: 'Comment updated successfully.',
      updateCommentData: existentComment,
    }
  }
}
