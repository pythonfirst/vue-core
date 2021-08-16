import { render } from './render.js';
import { h } from './h.js'
import { nodeOps } from './nodeOps.js';
const vnode = h('ul', { style: {
    width: '100px',
    height: '100px',
  }}, [
    h('li',null, 'a'),
    h('li',null, 'b'),
    h('li',null, 'c'),
  ])

  const textNode = h('div', {
    class: 'hello',
    style: {
      color: 'white',
      fontSize: '20px'
    },
    key: 'b'
  }, [
    h('li',null, 'a'),
    h('li',null, 'b'),
    h('li',null, 'c'),
  ], 1<<8)

  const textNode2 = h('div', {
    class: 'red',
    style: {
      color: 'blue',
    },
    key: 'a',
  }, 'hello', 1)
  
render(textNode, nodeOps.querySelector('#app'))
setTimeout(() => {
  render(textNode2, nodeOps.querySelector('#app'))
  console.log(textNode2)
}, 3000)
console.log(textNode)