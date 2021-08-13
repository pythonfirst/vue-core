/**
 * 
 * @param {String} type 
 * @param {Object} props 
 * @param {} children 
 */
function VNode(type, props, children) {
  this.type = type,
  this.props = props,
  this.children = children
}

module.exports = VNode
