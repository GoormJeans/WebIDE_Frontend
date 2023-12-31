export let data2 = {
  statusCode: 200,
  data: [
    
  ],
};

class Node {
  constructor(value = "", word = "") {
    this.key = value;
    this.title =
      word.charAt(word.length - 1) === "/"
        ? word.substring(0, word.length - 1)
        : word;
    this.children = [];
    this.isFolder = value.charAt(value.length - 1) === "/" ? false : true;
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
    for (let i=0;i< words.length;i++) {
      const word = words[i];
      if (word === undefined) continue;
      if (!currentNode.children[word]) {
        currentNode.children[word] = new Node(currentNode.key + word, word);
      }
      currentNode = currentNode.children[word];
      if(currentNode.children.length >= 1)
        currentNode.isLeaf = true;
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
        isFolder : curNode.isFolder,
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
  if (data1 === undefined) {
    return ;
  }
  const trie = new Trie();
  console.log(data1);
  if(data1 === undefined)
    return ;
  const loop = data1.data.length;
  for (let i = 0; i < loop; i++) {
    trie.insert(data1.data[i].path);
  }
  const asd = trie.print();
  return asd;
};

export const gData = solution(data2);