// umi mock: https://umijs.org/zh/guide/mock-data.html
// mockjs:  https://github.com/nuysoft/Mock/wiki

import mockjs from 'mockjs';

let dataSource = mockjs.mock({
  'list|15-30': [{
      'id': () => mockjs.Random.guid(),
      'name': /[a-zA-Z0-9]{4,8}/,
      'email': /[a-zA-Z0-9]{4,8}@test\.com/,
      'website': /[a-zA-Z0-9]{4,8}/
  }]
}).list;

export default {
  'GET /api/users': (req, res) => {
    const { page = 0, size = 10 } = req.query
    const _page = parseInt(page, 10)
    const _size = parseInt(size, 10)
    const data = dataSource.slice(_page * _size, (_page + 1) * _size);
    res.json({
      content: data,
      number: _page,
      size: _size,
      totalElements: dataSource.length,
    })
  },

  'POST /api/users': (req, res) => {
    const newUser = {
      id: mockjs.Random.guid(),
      ...req.body,
    }
    dataSource.push(newUser);
    res.json(newUser)
   },

   'PUT /api/users/:id': (req, res) => {
      const { id } = req.params
      const { body: values } = req;
      dataSource.forEach(one => {
        if (one.id === id) {
          Object.assign(one, values)
        }
      })
      res.send('ok')
   },

   'DELETE /api/users/:id': (req, res) => {
      const { id } = req.params
      dataSource = dataSource.filter(one => one.id !== id)
      res.send('ok')
  },
};
