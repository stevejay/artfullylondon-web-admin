import * as entityCardLib from './entity-card'

describe('getEntityCardImageData', () => {
  it('should create a url object', () => {
    const actual = entityCardLib.getEntityCardImageData('1234')

    expect(actual).toEqual({
      height: 175,
      url: 'https://images.test.com/12/34/1234/500x350.jpg'
    })
  })
})
