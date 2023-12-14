import { Provider } from "rc-motion";
import React from 'react';
import Tree from 'rc-tree';
import '../../assets/File_tree/index.css';
import '../../assets/File_tree/animation.less';
const STYLE = `
.rc-tree-child-tree {
  display: block;
}

.node-motion {
  transition: all .3s;
  overflow-y: hidden;
}
&-node-selected{
    background-color : #000000;

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

// JSON 파일로 받아올 부분
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



const arrowPath =
    'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88' +
    '.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.' +
    '6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5.' +
    '2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

const getSvgIcon = (path: any, iStyle = {}, style = {}) => (
    <i style={iStyle}>
        <svg
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
            fill="currentColor"
            style={{ verticalAlign: '-.125em', ...style }}
        >
            <path d={path} />
        </svg>
    </i>
);






const File_tree = () => {
    const treeRef: any = React.useRef();
    const [enableMotion] = React.useState(true);

    const switcherIcon = (obj: any) => {
        if (obj.data.key?.startsWith('0-0-3')) {
            return false;
        }
        if (obj.isLeaf) {
            return;
        }
        return getSvgIcon(
            arrowPath,
            { cursor: 'pointer', backgroundColor: 'white' },
            { transform: `rotate(${obj.expanded ? 90 : 0}deg)` },
        );
    };

    const treeCls = `myCls${(' customIcon') || ''}`;
    if (treeRef == undefined)
        return (<div></div>);
    return (
        <div>
            <style dangerouslySetInnerHTML={{ __html: STYLE }} />
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex-start' }}>
                    <Tree
                        ref={treeRef}
                        // defaultExpandAll={false}
                        defaultExpandAll
                        defaultExpandedKeys={defaultExpandedKeys}
                        motion={motion}
                        style={{ height: '50vh' }}
                        treeData={getTreeData()}
                        //icon={ }
                        showIcon={false}
                        switcherIcon={switcherIcon}
                        virtual={true}
                    />
                </div>
            </div>
        </div>
    );
};


export default File_tree;
