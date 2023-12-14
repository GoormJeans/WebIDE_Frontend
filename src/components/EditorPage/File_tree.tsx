import { Provider } from "rc-motion";
import Tree from "rc-tree";
import React from 'react';
import '../../assets/file_tree/index.less';
import '../../assets/file_tree/animation.less';
import "rc-tree/assets/index.css"
const STYLE = `
.rc-tree-child-tree {
  display: block;
}

.node-motion {
  transition: all .3s;
  overflow-y: hidden;
}
`;

const defaultExpandedKeys = ['0', '0-2', '0-9-2'];

const motion = {
    motionName: 'node-motion',
    motionAppear: false,
    onAppearStart: () => ({ height: 0 }),
    onAppearActive: (node: any) => ({ height: node.scrollHeight }),
    onLeaveStart: (node: any) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
};

function getTreeData() {
    // big-data: generateData(1000, 3, 2)
    return [
        {
            key: '0',
            title: 'node 0',
            children: [
                { key: '0-0', title: 'node 0-0' },
                { key: '0-1', title: 'node 0-1' },
                {
                    key: '0-2',
                    title: 'node 0-2',
                    children: [
                        { key: '0-2-0', title: 'node 0-2-0' },
                        { key: '0-2-1', title: 'node 0-2-1' },
                        { key: '0-2-2', title: 'node 0-2-2' },
                    ],
                },
                { key: '0-3', title: 'node 0-3' },
                { key: '0-4', title: 'node 0-4' },
                { key: '0-5', title: 'node 0-5' },
                { key: '0-6', title: 'node 0-6' },
                { key: '0-7', title: 'node 0-7' },
                { key: '0-8', title: 'node 0-8' },
                {
                    key: '0-9',
                    title: 'node 0-9',
                    children: [
                        { key: '0-9-0', title: 'node 0-9-0' },
                        {
                            key: '0-9-1',
                            title: 'node 0-9-1',
                            children: [
                                { key: '0-9-1-0', title: 'node 0-9-1-0' },
                                { key: '0-9-1-1', title: 'node 0-9-1-1' },
                                { key: '0-9-1-2', title: 'node 0-9-1-2' },
                                { key: '0-9-1-3', title: 'node 0-9-1-3' },
                                { key: '0-9-1-4', title: 'node 0-9-1-4' },
                            ],
                        },
                        {
                            key: '0-9-2',
                            title: 'node 0-9-2',
                            children: [
                                { key: '0-9-2-0', title: 'node 0-9-2-0' },
                                { key: '0-9-2-1', title: 'node 0-9-2-1' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            key: '1',
            title: 'node 1',
            // children: new Array(1000)
            //   .fill(null)
            //   .map((_, index) => ({ title: `auto ${index}`, key: `auto-${index}` })),
            children: [
                {
                    key: '1-0',
                    title: 'node 1-0',
                    children: [
                        { key: '1-0-0', title: 'node 1-0-0' },
                        {
                            key: '1-0-1',
                            title: 'node 1-0-1',
                            children: [
                                { key: '1-0-1-0', title: 'node 1-0-1-0' },
                                { key: '1-0-1-1', title: 'node 1-0-1-1' },
                            ],
                        },
                        { key: '1-0-2', title: 'node 1-0-2' },
                    ],
                },
            ],
        },
    ];
}

const File_tree = () => {
    const treeRef: any = React.useRef();
    const [enableMotion, setEnableMotion] = React.useState(true);

    setTimeout(() => {
        if (treeRef == undefined)
            return;
        treeRef.current.scrollTo({ key: '0-9-2' });
    }, 100);
    if (treeRef == undefined)
        return (<div></div>);
    return (
        <Provider motion={enableMotion}>
            <button
                onClick={() => {
                    setEnableMotion(e => !e);
                }}
            >
            </button>

            <React.StrictMode>
                <div className="animation">
                    <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                    <div style={{ display: 'flex' }}>
                        <div style={{}}>
                            <Tree
                                ref={treeRef}
                                // defaultExpandAll={false}
                                defaultExpandAll
                                defaultExpandedKeys={defaultExpandedKeys}
                                motion={motion}
                                style={{ height: '50vh' }}
                                treeData={getTreeData()}
                            />
                        </div>
                    </div>
                </div>
            </React.StrictMode>
        </Provider>
    );
};


export default File_tree;
