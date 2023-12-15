import React from 'react';
import Tree from 'rc-tree';
import '../../assets/file_tree/index.css';
import '../../assets/file_tree/animation.less';

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


//교체할 커스텀 icon
const FolderCloseIcon =
    'M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z';
const FolderOpenIcon =
    'M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z';

const Fileicon =
    'M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z';
const Fileiconview = '0 0 384 512'
const FolderCloseView = '0 0 512 512';
const FolderOpenView = '0 0 576 512';

const getSvgIcon = (path: any, view: any, iStyle = {}) => (
    <i style={iStyle}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={view}
            width="1em"
            height="1em"
            fill="currentColor"
            style={{ verticalAlign: '-.125em' }}
        >
            <path d={path} />
        </svg>
    </i>
);






const File_tree = () => {
    const treeRef: any = React.useRef();
    const onSelect = (obj: any) => {
        console.log(obj);
    }
    const switcherIcon = (obj: any) => {
        if (obj.data.key?.startsWith('0-0-3')) {
            return false;
        }
        if (obj.isLeaf) {
            return getSvgIcon(Fileicon, Fileiconview, { cursor: 'pointer', backgroundColor: 'white' });
        }
        return getSvgIcon(
            obj.expanded ? FolderOpenIcon : FolderCloseIcon, obj.expanded ? FolderOpenView : FolderCloseView,
            { cursor: 'pointer', backgroundColor: 'white' }
        );
    };
    if (treeRef === undefined)
        return (<div></div>);
    return (
        <div className="overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: STYLE }} />
            <div style={{ overflow: 'hidden', display: 'flex' }}>
                <div style={{ display: 'flex-start' }}>
                    <Tree
                        ref={treeRef}
                        // defaultExpandAll={false}
                        defaultExpandAll
                        defaultExpandedKeys={defaultExpandedKeys}
                        motion={motion}
                        style={{ height: '100%' }}
                        treeData={getTreeData()}
                        //icon={ }
                        onSelect={onSelect}
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
