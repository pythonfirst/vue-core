import { ShapeFlags } from "../shared/src/shapeFlags.js";
import { PatchFlags } from "../shared/src/patchFlags.js";
import { nodeOps } from "./nodeOps.js";
import { isSameVNodeType } from "./h.js";

/**
 * 渲染器
 * @param {VNode} vnode 
 * @param {Node} container 
 */
export function render(vnode, container) {
  // 新vnode不存在
  if (vnode === null) {
    // 如果旧vnode存在则卸载掉
    if (container._vnode) {
      unmount(container._vnode.el)
    }
  } else {
    patch(container._vnode || null, vnode, container)
  }
  // 很重要，给container node挂载vnode元素。
  container._vnode = vnode;
}

/**
 * 比较新旧vnode
 * @param {node} n1 旧vnode
 * @param {node} n2 新vnode
 * @param {node} container 
 */
function patch(n1, n2, container, anchor=null) {
  // n1n2相等，直接返回
  if (n1 === n2) {
    return
  }

  // n1存在与n2不是同一种vnode类型
  if (n1 && !isSameVNodeType(n1, n2)) {
    unmount(n1.el)
    n1 = null
  }

  const { type, shapeFlag } = n2
  switch (type) {
    case Text:
      // processText
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container)
      }
  }
}

/**
 * 挂载vnode到DOM
 * @param {VNode} vnode 
 * @param {node} container 
 */
function mount(vnode, container) {
  const { shapeFlag } = vnode;
  if (shapeFlag & ShapeFlags.ELEMENT) {
    mountElement(vnode, container)
  }
}

/**
 * 移除已经挂载的节点
 * @param {node} el 
 */
function unmount(el) {
  nodeOps.remove(el)
}

/**
 * 
 * @param {VNode} vnode 
 * @param {node} container 
 */
function mountElement(vnode, container) {
  const el = nodeOps.createElement(vnode.type);
  // 设置标签属性
  if (vnode.props) {
    // setAttribute(vnode.props, el)
    for (let k in vnode.props) {
      const nextValue = vnode.props[k];
      patchProps(el, vnode.props, null, k, nextValue)
    }
  }

  // 递归挂载子节点
  if (vnode.children && typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  } else if (vnode.children && Array.isArray(vnode.children)) {
    if (vnode.children.length) {
      for (let childVNode of vnode.children) {
        mount(childVNode, el)
      }
    }
  }

  vnode.el = el;
  nodeOps.insert(el, container, null);
  // 渲染的vnode引用真实DOM
}

/**
 * 给node设置属性
 * @param {Object} props 
 * @param {Node} el 
 */
function setAttribute(props, el) {
  
}

function processText() {

};

function processElement(n1, n2, container) {
  // 旧node没有，则直接挂载新node
  if (n1 === null) {
    mount(n2, container)
    return
  } else {
    // 拿到当前渲染的dom节点
    const el = (n2.el = n1.el);
    // 拿到新旧vnode的props
    const preProps = n1.props;
    const nextProps = n2.props;
    if (nextProps) {
      // 遍历新node,挂载新node
      for (let k in nextProps) {
        const nextValue = nextProps[k];
        patchProps(el, nextProps, preProps,  k, nextValue)
      }
    }

    if (preProps) {
      // 遍历旧vnode，将不存在新node的节点移除。
      for (let k in preProps) {
        const preValue = preProps[k];
        if (preValue && !nextProps.hasOwnProperty(k)) {
          patchProps(el, nextProps, preProps, k, '')
        }
      }
    }

    // patch 子节点
    patchChildren(n1, n2, el)
  }
}

function patchElemnt(n1, n2, container) {
 
}

/**
 * 
 * @param {node} el 
 * @param {vnode props} props 
 * @param {vnode key} k 
 * @param {新vnode key value} next 
 */
function patchProps(el, nextProps, preProps, k, next) {
  switch (k) {
    case 'style':
      // 遍历新 VNode 的props,将样式更新到dom
      for (let key in next) {
        el.style[key] = next[key];
      }

      // 遍历旧节点删除，删除更新后没有的旧样式
      if (preProps) {
        for (let k in preProps.style) {
          if (!next.hasOwnProperty(k)) {
            el.style[k] = ''
          }
        }
      }
      break
    case 'class':
      el.className = next
      break
    default:
      el.setAttribute(k, next);
  }
}

/**
 * patch 子节点
 * @param {*} n1 
 * @param {*} n2 
 * @param {*} el 
 */
function patchChildren(n1, n2, el) {

  const { patchFlag, shapeFlag } = n2;

  if (patchFlag > 0) {
    if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
      patchKeyedChildren(n1, n2, el);
      return
    } else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
      patchUnKeyedChildren(n1, n2, el)
    }
  }
}

function patchKeyedChildren(n1, n2, el) {
  const c1 = n1?.children || [];
  const c2 = n2?.children || [];

  const l1 = c1.length;
  const l2 = c2.length;
  const commonLength = Math.min(l1, l2);

  // 遍历新旧节点，分别进行patch
  for (let i=0; i<commonLength; i++) {
    patch(c1[i], c2[i])
  }

  // 旧节点数量多于新节点，移除多余旧节点
  if (l1 > l2) {
    unmountChildren(c1, commonLength)
  }

  if (l1 < l2) {
    mountChildren(c2, commonLength, el);
  }

}

function patchUnKeyedChildren(n1, n2, el) {
  // console.log(n1, n2)
  const c1 = n1?.children || [];
  const c2 = n2?.children || [];

  if (Array.isArray(n1) && Array.isArray(n2)) {

    const l1 = c1.length;
    const l2 = c2.length;
    const commonLength = Math.min(l1, l2);

    // 遍历新旧节点，分别进行patch
    for (let i=0; i<commonLength; i++) {
      console.log(c1[i], c2[i], i)
      patch(c1[i], c2[i])
    }

    // 旧节点数量多于新节点，移除多余旧节点
    if (l1 > l2) {
      unmountChildren(c1, commonLength)
    }

    if (l1 < l2) {
      mountChildren(c2, commonLength, el);
    }
  } else {
    if (Array.isArray(c1)) {
      // console.log(c1, c2, el)
      // el.textContent = ''
      // patch(null, n2, el)
    } else {
      el.textContent = '';
      mountChildren(n2, 0, el)
    }
  }
}

function unmountChildren(n, start) {
  for (let i=start; i<n.length; i++) {
    // console.log('n[i]', n[i])
    unmount(n[i].el)
  }
}

function mountChildren(n, start, el) {
  const children = n.children || [];
  for (let i=start; i< children.length; i++) {
    patch(null, children[i], el)
  }
}