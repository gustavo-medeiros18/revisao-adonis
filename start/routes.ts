/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource('moments', 'MomentsController').apiOnly()

  Route.post('/moments/:momentId/comments', 'CommentsController.store')
  Route.get('/moments/:momentId/comments', 'CommentsController.index')
  Route.get('/moments/:momentId/comments/:commentId', 'CommentsController.show')
  Route.patch('/moments/:momentId/comments/:commentId', 'CommentsController.update')
  Route.delete('/moments/:momentId/comments/:commentId', 'CommentsController.destroy')
}).prefix('/api')
