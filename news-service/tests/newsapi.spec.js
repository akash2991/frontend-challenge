/* eslint-disable no-var */
const fetch = require('../newsapi') // eslint-disable-line prefer-destructuring

describe('fetch news', () => {
  it('should fetch the top headlines from the UK', async (done) => {
    expect.assertions(2)
    const params = {
      country: 'gb',
    }
    return fetch
      .headlines(params)
      .then((data) => {
        expect(data.status).toEqual('ok')
        expect(data).toHaveProperty('articles')
      })
      .then(() => {
        done()
      })
  })

  it('should fetch all headlines if no parameters are specified', async (done) => {
    expect.assertions(2)

    return fetch
      .headlines()
      .then((data) => {
        expect(data.status).toEqual('ok')
        expect(data.totalResults).toBeGreaterThan(500)
      })
      .then(() => {
        done()
      })
  })

  // it('should filter by keywords', async (done) => {
  //     expect.assertions(2)
  //     const params = {
  //         country: 'gb'
  //     }
  //     return fetch.headlines(params).then(data => {
  //         expect(data.status).toEqual('ok')
  //         expect(data).toHaveProperty('articles')
  //     }).then(() => {
  //         done()
  //     });
  // })

  it('should filter articles by type', async (done) => {
    expect.assertions(1)
    const type = 'headlines'
    const params = {
      country: 'gb',
    }
    return fetch
      .fetchArticles(type, params)
      .then((data) => {
        expect(data.length).toBeGreaterThan(5)
      })
      .then(() => {
        done()
      })
  })
})
