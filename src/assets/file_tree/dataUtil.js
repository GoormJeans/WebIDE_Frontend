

export const gData = 
[{
    key: '9000',
    title: '9000',
    isLeaf : false,
    children: [
      { key: '9000/asd.py', title: 'asd.py', isLeaf : true },
      { key: '9000/as.py', title: 'as.py', isLeaf : true },
      {
        key: '9000/1',
        title: '1',
        isLeaf : false,
        children: [
          { key: '9000/1/asd.cpp', title: 'asd.cpp' ,isLeaf : true},
          { key: '9000/1/awx.cpp', title: 'awx.cpp', isLeaf : true },
          { key: '9000/1/qwe.cpp', title: 'qwe.cpp', isLeaf : true },
        ],
      },
      { key: '9000/12', title: '12', isLeaf : true },
      { key: '9000/13', title: '13', isLeaf : true },
    ],
  },];

function isPositionPrefix(smallPos, bigPos) {
    if (bigPos.length < smallPos.length) {
        return false;
    }
    // attention: "0-0-1" "0-0-10"
    if (bigPos.length > smallPos.length && bigPos.charAt(smallPos.length) !== '-') {
        return false;
    }
    return bigPos.substr(0, smallPos.length) === smallPos;
}
// console.log(isPositionPrefix("0-1", "0-10-1"));

// arr.length === 628, use time: ~20ms
export function filterParentPosition(arr) {
    const levelObj = {};
    arr.forEach(item => {
        const posLen = item.split('-').length;
        if (!levelObj[posLen]) {
            levelObj[posLen] = [];
        }
        levelObj[posLen].push(item);
    });
    const levelArr = Object.keys(levelObj).sort();
    for (let i = 0; i < levelArr.length; i += 1) {
        if (levelArr[i + 1]) {
            levelObj[levelArr[i]].forEach(ii => {
                for (let j = i + 1; j < levelArr.length; j += 1) {
                    levelObj[levelArr[j]].forEach((_i, index) => {
                        if (isPositionPrefix(ii, _i)) {
                            levelObj[levelArr[j]][index] = null;
                        }
                    });
                    levelObj[levelArr[j]] = levelObj[levelArr[j]].filter(p => p);
                }
            });
        }
    }
    let nArr = [];
    levelArr.forEach(i => {
        nArr = nArr.concat(levelObj[i]);
    });
    return nArr;
}
// console.log(filterParentPosition(
//   ['0-2', '0-3-3', '0-10', '0-10-0', '0-0-1', '0-0', '0-1-1', '0-1']
// ));

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
    return str.split('-');
}
function splitLen(str) {
    return str.split('-').length;
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
        expandedPosArr.forEach(p => {
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
    return pos.join(',') === pos1.join(',');
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
                    // 后来覆盖前者
                    lenObj[posLen][i] = [pos, k];
                } else if (spl(pkArr[0]) !== spl(pos)) {
                    lenObj[posLen].push([pos, k]);
                }
            });
        }
    };
    pkObjArr.forEach(pk => {
        getPosKey(pk[0], pk[1]);
    });
    if (key) {
        getPosKey(selPkObjArr[0], selPkObjArr[1]);
    }

    Object.keys(lenObj).forEach(item => {
        lenObj[item].forEach(i => {
            if (res.indexOf(i[1]) === -1) {
                res.push(i[1]);
            }
        });
    });
    return res;
}