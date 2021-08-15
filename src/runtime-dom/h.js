import { ShapeFlags } from "../shared/src/shapeFlags.js"
export function h(type, props=null, children=null,) {
  return {
    type,
    props,
    children,
    el: null, // 该vnode引用的dom
    shapeFlag: typeof type === 'string' ? ShapeFlags.ELEMENT : 0,
  }
}

export function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key
}