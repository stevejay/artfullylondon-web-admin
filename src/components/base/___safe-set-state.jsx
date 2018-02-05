// https://github.com/axetroy/react-safe-setstate

export default function safeSetState (options = {}) {
  return function (target) {
    // target.isTestable = true
    const setState = target.prototype.setState

    const componentWillUnmount =
      target.prototype.componentWillUnmount || function () {}

    target.prototype.setState = function () {
      return setState.apply(this, [...arguments])
    }

    target.prototype.componentWillUnmount = function () {
      const value = componentWillUnmount.apply(this, [...arguments])
      this.setState = () => {}
      return value
    }

    return target
  }
}
