/* eslint-disable no-console, react/no-access-state-in-setstate */
import React from "react";
import ReactDOM from "react-dom";
import { gData } from "../../assets/file_tree/dataUtil";
import "../../assets/file_tree/index.css";
import "../../assets/file_tree/animation.less";
import "../../assets/file_tree/draggable.less";
import "./contextmenu.css";
import Tree from "rc-tree";
//import { CreateFolder } from "../../api/EditfetchUrl";

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




function contains(root: any, n: any) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

const allowDrop: any = (paramobj: { dropNode: any; dropPosition: any }) => {
  if (!paramobj.dropNode.children) {
    if (paramobj.dropPosition === 0) return false;
  }
  return true;
};




const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onAppearStart: () => ({ height: 0 }),
  onAppearActive: (node: any) => ({ height: node.scrollHeight }),
  onLeaveStart: (node: any) => ({ height: node.offsetHeight }),
  onLeaveActive: () => ({ height: 0 }),
};

const FolderCloseIcon =
  "M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z";
const FolderOpenIcon =
  "M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z";

const Fileicon =
  "M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z";
const Fileiconview = "0 0 384 512";
const FolderCloseView = "0 0 512 512";
const FolderOpenView = "0 0 576 512";
const getSvgIcon = (path: any, view: any, iStyle = {}) => (
  <i style={iStyle}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={view}
      width="1em"
      height="1em"
      fill="currentColor"
      style={{ verticalAlign: "-.125em" }}
    >
      <path d={path} />
    </svg>
  </i>
);

const handleCreateFolder  = (e:any) =>{

}
const handleCreateFile  = (e:any) =>{
  
}

const handleDelete = (e : any) => {
  console.log(e);
}


class File_tree extends React.Component {
  state = {
    gData,
    autoExpandParent: true,
    expandedKeys: [],
    selectedKeys: [0 - 1],
  };
  cmContainer: any = null;
  toolTip: any = null;

  componentDidMount() {
    this.getContainer();
    contains(ReactDOM.findDOMNode(this), this.cmContainer);
  }

  componentWillUnmount() {
    if (this.cmContainer != null) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      document.body.removeChild(this.cmContainer);
      this.cmContainer = null;
    }
  }

  onDragStart = (info: any) => {
    console.log("start", info);
  };

  onDragEnter = () => {
    console.log("enter");
  };

  onDrop = (info: any) => {
    console.log("drop", info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data: any, key: any, callback: any) => {
      data.forEach((item: any, index: any, arr: any) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item: any, index: any, arr: any) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    console.log(dragObj.key);
    console.log(dropPosition);  //dropPosition : -1 : 외부 dropPosition 1 : 외부 //dropPosition 0 : 내부
    console.log(dropKey);

    this.setState({
      gData: data,
    });
  };

  onExpand = (expandedKeys: any) => {
    console.log("onExpand", expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onSelect = (selectedKeys: any) => {
    this.setState({ selectedKeys });
  };

  onRightClick = (info: any) => {
    console.log("right click", info);
    this.setState({ selectedKeys: [info.node.props.eventKey] });
    this.renderCm(info);
  };

  onMouseLeave = (info: any) => {
    console.log("leave", info);
  };

  getContainer = () => {
    if (this.cmContainer == null) {
      this.cmContainer = document.createElement("div");
      document.body.appendChild(this.cmContainer);
    }
    return this.cmContainer;
  };

  renderCm(info: any) {
    if (this.toolTip != null) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }
    this.toolTip = (
      <div id="fileTreeRight">
        <div className="flex w-full flex-col bg-stone-300 border-solid border-1 border-stone-200 rounded-lg pt-2 pb-2 shadow-md">
          <div onClick={()=>{console.log(info.node)}}>{info.node.key}</div>
          <div onClick={(e:any)=>handleDelete(info.node.key)} className="hover:bg-stone-400 pl-4 pr-4" id={info.node.key}>삭제하기</div>
          <div onClick={this.Createfile} className="hover:bg-stone-400 pl-4 pr-4" id={info.node.key}>파일 생성하기</div>
          <div onClick={this.Createfolder} className="hover:bg-stone-400 pl-4 pr-4" id={info.node.props.title}>폴더 생성하기</div>
        </div>
      </div>
    );

    Object.assign(this.cmContainer.style, {
      position: "absolute",
      left: `${info.event.pageX}px`,
      top: `${info.event.pageY}px`,
    });

    ReactDOM.render(this.toolTip, this.cmContainer);
  }

  switcherIcon = (obj: any) => {
    if (obj.data.key?.startsWith("0-0-3")) {
      return false;
    }
    if (obj.isLeaf) {
      return getSvgIcon(Fileicon, Fileiconview, {
        cursor: "pointer",
        backgroundColor: "white",
      });
    }
    return getSvgIcon(
      obj.expanded ? FolderOpenIcon : FolderCloseIcon,
      obj.expanded ? FolderOpenView : FolderCloseView,
      { cursor: "pointer", backgroundColor: "white" }
    );
  };
  unmount = (e : any) =>{
    if (this.toolTip != null) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }
  }

  
  Createfile = (e : any) => {
    if (this.toolTip != null) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }
    this.toolTip = (
      <div id="Tooltip">
        <div className="flex w-full flex-col bg-stone-300 border-solid border-1 border-stone-200 rounded-lg pt-2 pb-2 shadow-md">
          <div onClick = {handleCreateFile} className="hover:bg-stone-400 pl-4 pr-4">파일 생성하기</div>
          <div onClick={this.unmount} className="hover:bg-stone-400 pl-4 pr-4">취소하기</div>
        </div>
      </div>
    );

    Object.assign(this.cmContainer.style, {
      position: "absolute",
      left: `50%`,
      top: `50%`,
    });

    ReactDOM.render(this.toolTip, this.cmContainer);
  }
  Createfolder = (e : any) => {
    if (this.toolTip != null) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }
    this.toolTip = (
      <div id="Tooltip">
        <div className="flex w-full flex-col bg-stone-300 border-solid border-1 border-stone-200 rounded-lg pt-2 pb-2 shadow-md">
          <div onClick={handleCreateFolder} className="hover:bg-stone-400 pl-4 pr-4">폴더 생성하기</div>
          <div onClick={this.unmount} className="hover:bg-stone-400 pl-4 pr-4">취소하기</div>
        </div>
      </div>
    );
    Object.assign(this.cmContainer.style, {
      position: "absolute",
      left: `50%`,
      top: `50%`,
    });

    ReactDOM.render(this.toolTip, this.cmContainer);
  }
  

  render() {
    return (
      <div className="flex flex-col overflow-hidden w-100%">
        <div className="flex justify-end hover:text-white" onClick={this.Createfolder}>+</div>
        <style dangerouslySetInnerHTML={{ __html: STYLE }} />
        <div style={{ overflow: "hidden", display: "flex" }}>
          <div style={{ display: "flex-start" }}>
            <Tree
              showLine
              allowDrop={allowDrop}
              onRightClick={this.onRightClick}
              selectedKeys={this.state.selectedKeys}
              expandedKeys={this.state.expandedKeys}
              onExpand={this.onExpand}
              autoExpandParent={this.state.autoExpandParent}
              draggable
              onDragStart={this.onDragStart}
              onDrop={this.onDrop}
              showIcon={false}
              treeData={this.state.gData}
              motion={motion}
              style={{ height: "100%" }}
              onSelect={this.onSelect}
              switcherIcon={this.switcherIcon}
              virtual={true}
            ></Tree>
          </div>
        </div>
      </div>
    );
  }
}

export default File_tree;
