import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/api')

  response.assertBodyContains({ hello: 'world' })
})

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
