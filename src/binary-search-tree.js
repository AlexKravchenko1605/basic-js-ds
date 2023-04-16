const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNODE = null;
  }
  root() {
    if (this.rootNODE) {
      return this.rootNODE;
    } else {
      return null;
    }
  }

  add(data) {
    this.rootNODE = addWidthin(this.rootNODE, data);

    function addWidthin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addWidthin(node.left, data);
      } else {
        node.right = addWidthin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWidthin(this.rootNODE, data);
    function searchWidthin(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      return data < node.data
        ? searchWidthin(node.left, data)
        : searchWidthin(node.right, data);
    }
  }

  find(data) {
    return findWidthin(this.rootNODE, data);
    function findWidthin(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data
        ? findWidthin(node.left, data)
        : findWidthin(node.right, data);
    }
  }

  remove(data) {
    this.rootNODE = removeNode(this.rootNODE, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      // определяем в какую сторону пойдем.
      // если искомое значение меньше значения в узле, то пойдем влево.
      if (data < node.data) {
        node.left = removeNode(node.left, data); // удали в левом поддереве наше искомое значение, а результат положи в левое дерево.
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data); // удали в правом поддереве наше искомое значение, а результат положи в правое дерево.
        return node;
      } else if (node.data === data) {
        //  если узел лист, то мы просто его удаляем, заменя на null.
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        // есть оба поддерева
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.rootNODE) {
      return null;
    }
    let node = this.rootNODE;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootNODE) {
      return null;
    }
    let node = this.rootNODE;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
