const doc = (typeof document !== 'undefined' ? document : null);

export const nodeOps = {
  // 添加DOM节点到anchor节点的前面
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },
  
  remove: (child) => {
    const parent = child.parent;
    if (parent) {
      parent.removeChild;
    }
  },

  // 创建元素
  createElement: (tag, is, props) => {
    const el = doc.createElement(tag, is ? { is } : undefined)
    return el
  },

  querySelector: selector => doc.querySelector(selector),
  
  // 下一个兄弟节点
  nextSibling: node => node.nextSibling,

  setElementText: (el, text) => {
    el.textContent = text
  },
}