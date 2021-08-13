const VNode = require('./vnode')
// 老节点
let oldNode = new VNode('ul', undefined, [
  new VNode('li', [{key: 'a'}], 'a'),
  new VNode('li', [{key: 'b'}], 'b'),
  new VNode('li', [{key: 'c'}], 'c'),
  new VNode('li', [{key: 'd'}], 'd'),
  new VNode('li', [{key: 'e'}], 'e'),
])

// 删除位于中间位置的C节点
// let newNode = new VNode('ul', undefined, [
//   new VNode('li', [{key: 'a'}], 'a'),
//   new VNode('li', [{key: 'b'}], 'b'),
//   new VNode('li', [{key: 'd'}], 'd'),
//   new VNode('li', [{key: 'e'}], 'e'),
// ])

// 需要添f点
// let newNode = new VNode('ul', undefined, [
//   new VNode('li', [{key: 'a'}], 'a'),
//   new VNode('li', [{key: 'b'}], 'b'),
//   new VNode('li', [{key: 'c'}], 'c'),
//   new VNode('li', [{key: 'f'}], 'f'),
//   new VNode('li', [{key: 'd'}], 'd'),
//   new VNode('li', [{key: 'e'}], 'e'),
// ])

// // 需要在中间添加yzx点
// let newNode = new VNode('ul', undefined, [
//   new VNode('li', [{key: 'a'}], 'a'),
//   new VNode('li', [{key: 'b'}], 'b'),
//   new VNode('li', [{key: 'c'}], 'c'),
//   new VNode('li', [{key: 'z'}], 'z'),
//   new VNode('li', [{key: 'y'}], 'y'),
//   new VNode('li', [{key: 'x'}], 'x'),
//   new VNode('li', [{key: 'd'}], 'd'),
//   new VNode('li', [{key: 'e'}], 'e'),
// ])

// 需要在末尾增加fg
let newNode = new VNode('ul', undefined, [
  new VNode('li', [{key: 'a'}], 'a'),
  new VNode('li', [{key: 'b'}], 'b'),
  new VNode('li', [{key: 'c'}], 'c'),
  new VNode('li', [{key: 'd'}], 'd'),
  new VNode('li', [{key: 'e'}], 'e'),
  new VNode('li', [{key: 'f'}], 'f'),
  new VNode('li', [{key: 'g'}], 'g'),
])

// console.log('old', JSON.stringify(oldNode))

// 判断vnode节点是否相同
function isSameNodeType(n1, n2) {
  return (n1.type === n2.type) && (n1.props[0].key === n2.props[0].key)
}

/**
 * patch变化节点
 * @param {*} n1 
 * @param {*} n2 
 * @param {*} container 
 */
function patch(n1, n2, container) {

  // 如果两个节点相同直接return
  if (n1 === n2) return
}

/**
 * 
 * @param {VNode} n1 
 * @param {VNode} n2 
 */
function diff(n1, n2) {
  // 左指针
  let i=0;
  // 旧节点长度
  let e1 = n1.length-1;
  // 新节点长度
  let e2 = n2.length-1;
  
  // 从左到右遍历
  while (i<=e1 && i<=e2) {
    if (!isSameNodeType(n1[i], n2[i])) {
      break
    }
    i++;
  };

  // 从右到左遍历
  while ( i <=e1 && i <=e2) {
    if (!isSameNodeType(n1[e1], n2[e2])) {
      break
    }
    e1--;
    e2--;
  }
  
  // 需要添加node
  if (i<=e2 && i > e1) {
    while (i<=e2) {
      n1.splice(i, null, n2[i]);
      i++
    }
  }

  // 需要删除node
  if (i<=e1 && i > e2) {
    while (i<=e1) {
      n1.splice(e1, 1);
      e1--;
    }
  }
  
  // 开始dom diff 的核心
  // 
  const oldToNewIndexMap = new Map();
  // 遍历旧节点，建立map
  while (i<=e1) {
    oldToNewIndexMap.set(n1[i].props[0].key, i)
    e1--;
  }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

// console.log('old', JSON.stringify(oldNode))
// console.log('new', JSON.stringify(newNode))

diff(oldNode.children, newNode.children)

console.log('old', JSON.stringify(oldNode))

