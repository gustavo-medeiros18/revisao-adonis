import { test } from '@japa/runner'

test('comment creation', async ({ client }) => {
  const response = await client.post('/api/moments/1/comments').json({
    username: 'gustavo.medeiros',
    text: 'Lorem ipsum',
  })

  response.assertStatus(201)
  response.assertBodyContains({
    message: 'Comment created',
    insertedComment: {
      username: 'gustavo.medeiros',
      text: 'Lorem ipsum',
      moment_id: '1',
    },
  })
})
