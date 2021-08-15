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

  // 需要做DOM diff的情况
  if (i < e1 && i<e2) { 
    const s1 = i;
    const s2 = i
    // 新数组
    let toBePatched = e2-i+1;


    // 存储新node中key对应的新的索引。
    let keyToNewIndexMap = new Map();
    // 新node在旧node的索引
    let arr = new Array(toBePatched).fill(-1);
    // 遍历新node,填充keyToNewIndexMap
    for (let i=0; i<toBePatched; i++) {
      keyToNewIndexMap.set(n2[i].props[0].key, i);
    }

    let moved = false;
    // 遍历旧节点 
    for (i=s1; i<=e1; i++) {
      // 拿到旧节点
      const preChild = n1[i];

      // 如果pached的大于已经patched,则删除及卸载节点
      if (patched >= toBePatched) {
        // todo:删除旧节点
        n1.splice(i, 1);
        i--;
        e1--;
        continue
      }

      // 查找旧子序列的节点在新子序列中的索引
      let newIndex = keyToNewIndexMap.get(preChild.props[0].key);
      // 如果该旧节点不存在在新node中，删除该节点。
      if (newIndex === undefined) {
        n1.splice(i, 1);
        i--;
        e1--;
      } else {
        // 更新arr即新node中待patch元素在
        arr[newIndex-s2] = i;
      }
    }

  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

// console.log('old', JSON.stringify(oldNode))
// console.log('new', JSON.stringify(newNode))

diff(oldNode.children, newNode.children)

console.log('old', JSON.stringify(oldNode))
