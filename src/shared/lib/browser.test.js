import * as browserLib from './browser'

class Node {
  constructor () {
    this.invoked = false
  }
  get scrollTop () {
    this.invoked = true
  }
}

describe('forceReflow', () => {
  it('should handle a null node', () => {
    browserLib.forceReflow(null)
  })

  it('should handle a valid node', () => {
    const node = new Node()
    browserLib.forceReflow(node)
    expect(node.invoked).toEqual(true)
  })
})
