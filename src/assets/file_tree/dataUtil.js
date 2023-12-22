export const data2 = {
  statusCode: 200,
  data: [
    {
      path: "1/1/2/",
    },
    {
      path: "1/1/2/hi.py",
    },
    {
      path: "1/1/empty.py",
    },
  ],
};

class Node {
  constructor(value = "", word = "") {
    this.key = value;
    this.title =
      word.charAt(word.length - 1) == "/"
        ? word.substring(0, word.length - 1)
        : word;
    this.children = [];
    this.isLeaf = value.charAt(value.length - 1) === "/" ? false : true;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
    this.output = "";
  }
  insert(line) {
    let currentNode = this.root;
    const words = line.split("/");
    words.shift();
    words.shift();
    for (let i = 0; i < words.length - 1; i++) words[i] = words[i] + "/";
    if (line[line.length - 1] === "/") words[words.length - 1] = undefined;
    for (const word of words) {
      if (word === undefined) continue;
      if (!currentNode.children[word]) {
        currentNode.children[word] = new Node(currentNode.key + word, word);
      }
      currentNode = currentNode.children[word];
    }
  }
  makeOutputForm(length, curNode) {
    let curNode1 = [];
    if (length === 0) {
      curNode = this.root;
      for (const child of Object.keys(curNode.children).sort()) {
        curNode1.push(this.makeOutputForm(length + 1, curNode.children[child]));
      }
    } else {
      curNode1 = {
        key: curNode.key,
        title: curNode.title,
        isLeaf: curNode.isLeaf,
        children: [],
      };
      for (const child of Object.keys(curNode.children).sort()) {
        curNode1.children.push(
          this.makeOutputForm(length + 1, curNode.children[child])
        );
      }
    }
    return curNode1;
  }
  print() {
    return this.makeOutputForm(0);
  }
}

export const solution = (data1) => {
  if (data1 == undefined) {
    const trie = new Trie();
    const loop = data2.data.length;
    for (let i = 0; i < loop; i++) {
      trie.insert(data2.data[i].path);
    }
    const asd = trie.print();
    return asd;
  }
  const trie = new Trie();
  console.log(data1);
  const loop = data1.data.length;
  for (let i = 0; i < loop; i++) {
    trie.insert(data1.data[i].path);
  }
  const asd = trie.print();
  return asd;
};

export const gData = solution(data2);

function isPositionPrefix(smallPos, bigPos) {
  if (bigPos.length < smallPos.length) {
    return false;
  }
  // attention: "0-0-1" "0-0-10"
  if (
    bigPos.length > smallPos.length &&
    bigPos.charAt(smallPos.length) !== "-"
  ) {
    return false;
  }
  return bigPos.substr(0, smallPos.length) === smallPos;
}
// console.log(isPositionPrefix("0-1", "0-10-1"));

// arr.length === 628, use time: ~20ms
export function filterParentPosition(arr) {
  const levelObj = {};
  arr.forEach((item) => {
    const posLen = item.split("-").length;
    if (!levelObj[posLen]) {
      levelObj[posLen] = [];
    }
    levelObj[posLen].push(item);
  });
  const levelArr = Object.keys(levelObj).sort();
  for (let i = 0; i < levelArr.length; i += 1) {
    if (levelArr[i + 1]) {
      levelObj[levelArr[i]].forEach((ii) => {
        for (let j = i + 1; j < levelArr.length; j += 1) {
          levelObj[levelArr[j]].forEach((_i, index) => {
            if (isPositionPrefix(ii, _i)) {
              levelObj[levelArr[j]][index] = null;
            }
          });
          levelObj[levelArr[j]] = levelObj[levelArr[j]].filter((p) => p);
        }
      });
    }
  }
  let nArr = [];
  levelArr.forEach((i) => {
    nArr = nArr.concat(levelObj[i]);
  });
  return nArr;
}

function loopData(data, callback) {
  const loop = (d, level = 0) => {
    d.forEach((item, index) => {
      const pos = `${level}-${index}`;
      if (item.children) {
        loop(item.children, pos);
      }
      callback(item, index, pos);
    });
  };
  loop(data);
}

function spl(str) {
  return str.split("-");
}
function splitLen(str) {
  return str.split("-").length;
}

export function getFilterExpandedKeys(data, expandedKeys) {
  const expandedPosArr = [];
  loopData(data, (item, index, pos) => {
    if (expandedKeys.indexOf(item.key) > -1) {
      expandedPosArr.push(pos);
    }
  });
  const filterExpandedKeys = [];
  loopData(data, (item, index, pos) => {
    expandedPosArr.forEach((p) => {
      if (
        ((splitLen(pos) < splitLen(p) && p.indexOf(pos) === 0) || pos === p) &&
        filterExpandedKeys.indexOf(item.key) === -1
      ) {
        filterExpandedKeys.push(item.key);
      }
    });
  });
  return filterExpandedKeys;
}

function isSibling(pos, pos1) {
  pos.pop();
  pos1.pop();
  return pos.join(",") === pos1.join(",");
}

export function getRadioSelectKeys(data, selectedKeys, key) {
  const res = [];
  const pkObjArr = [];
  const selPkObjArr = [];
  loopData(data, (item, index, pos) => {
    if (selectedKeys.indexOf(item.key) > -1) {
      pkObjArr.push([pos, item.key]);
    }
    if (key && key === item.key) {
      selPkObjArr.push(pos, item.key);
    }
  });
  const lenObj = {};
  const getPosKey = (pos, k) => {
    const posLen = splitLen(pos);
    if (!lenObj[posLen]) {
      lenObj[posLen] = [[pos, k]];
    } else {
      lenObj[posLen].forEach((pkArr, i) => {
        if (isSibling(spl(pkArr[0]), spl(pos))) {
          lenObj[posLen][i] = [pos, k];
        } else if (spl(pkArr[0]) !== spl(pos)) {
          lenObj[posLen].push([pos, k]);
        }
      });
    }
  };
  pkObjArr.forEach((pk) => {
    getPosKey(pk[0], pk[1]);
  });
  if (key) {
    getPosKey(selPkObjArr[0], selPkObjArr[1]);
  }

  Object.keys(lenObj).forEach((item) => {
    lenObj[item].forEach((i) => {
      if (res.indexOf(i[1]) === -1) {
        res.push(i[1]);
      }
    });
  });
  return res;
}
