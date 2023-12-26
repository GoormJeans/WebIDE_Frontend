/* eslint-disable no-console, react/no-access-state-in-setstate */
import { useEffect } from "react";
import ReactDOM from "react-dom";
import "../../assets/file_tree/index.css";
import "../../assets/file_tree/animation.less";
import "../../assets/file_tree/draggable.less";
import "./contextmenu.css";
import Tree from "rc-tree";
import {
  getSelect,
  Delete,
  Create,
  dragNdrop,
  getFiletree,
  setExpandedKeys,
  setSelectedKeys,
} from "../../api/FileTree";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../api/store";
//
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
const allowDrop: any = (paramobj: { dropNode: any; dropPosition: any }) => {
  if (!paramobj.dropNode.children) {
    if (paramobj.dropPosition === 0) return false;
  }
  return true;
};

const allow: any = (dropKey: string) => {
  if (dropKey[dropKey.length - 1] === "/") return true;
  return false;
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
let cmContainer: any = null;
let toolTip: any = null;
const File_tree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.FileTree);
  let FileName2 = "";
  const getfiletree: any = () => {
    dispatch(getFiletree(setting.probno));
  };

  useEffect(() => {
    getContainer();
    getfiletree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setting.fetchURL]);
  const handleDelete = (e: any) => {
    const data = {
      deletePathSuffix: e,
      algorithmId: setting.probno,
    };
    dispatch(Delete(data));
  };
  const handleCreateFolder = (e: any) => {
    if(FileName2 === "")
      return ;
    const path: string = e + FileName2 + "/";
    const data = {
      createPath: path,
      algorithmId: setting.probno,
    };

    dispatch(Create(data));
    unmount(e);
  };
  const handleCreaterootFolder = (e: any) => {
    if(FileName2 === "")
      return ;
    const data = {
      createPath: FileName2 + "/",
      algorithmId: setting.probno,
    };
    dispatch(Create(data));
    unmount(e);
  };
  const handleCreateFile = (e: any) => {
    if(FileName2 === "")
      return ;
    const path: string = e + FileName2;
    const data = {
      createPath: path,
      algorithmId: setting.probno,
    };
    dispatch(Create(data));
    unmount(e);
  };
  const handleDragNdrop = (dragkey: any, dragtitle: any, drop: any) => {
    const path: string = drop + dragtitle;
    dragNdrop({
      beforePath: dragkey,
      afterPath: path,
      algorithmId: setting.prob,
    });
  };
  const handleSelect = async (key: any) => {
    if (key[key.length - 1] === "/") return;
    const data = {
      algorithmId: setting.probno,
      sourceCodePath: key,
    };
    dispatch(getSelect(data));
  };

  const onDragStart = (info: any) => {
    console.log("start", info);
  };
  const onDrop = (info: any) => {
    console.log("drop", info);
    const dropKey = info.node.key;
    const droptitle = info.node.title;
    const dragKey = info.dragNode.key;
    let dragtitle = info.dragNode.title;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    if (!allow(dropKey) && dropPosition === 0) return;

    if (dropPosition === 0) {
      dragtitle =
        dragKey[dragKey.length - 1] === "/" ? dragtitle + "/" : dragtitle;
      handleDragNdrop(dragKey, dragtitle, dropKey);
    } else {
      dragtitle =
        dragKey[dragKey.length - 1] === "/" ? dragtitle + "/" : dragtitle;
      const drops = dropKey.substr(
        0,
        dropKey[dropKey.length - 1] === "/"
          ? dropKey.length - droptitle.length - 1
          : dropKey.length - droptitle.length
      );
      handleDragNdrop(dragKey, dragtitle, drops);
    }
  };

  const onExpand = (expandedKeys: any) => {
    dispatch(setExpandedKeys(expandedKeys));
  };
  const onSelect = (selectedKeys: any) => {
    dispatch(setSelectedKeys(selectedKeys));
    if (selectedKeys.length === 0) return;
    handleSelect(selectedKeys[0]);
  };

  const onRightClick = (info: any) => {
    console.log("right click", info);
    dispatch(setSelectedKeys([info.node.props.eventKey]));
    renderCm(info);
  };

  const handleChange = async (e: any) => {
    FileName2 = e.target.value;
    console.log(FileName2);
  };

  const getContainer = () => {
    if (cmContainer == null) {
      cmContainer = document.createElement("div");
      document.body.appendChild(cmContainer);
    }
    return cmContainer;
  };

  const renderCm = (info: any) => {
    if (toolTip != null) {
      ReactDOM.unmountComponentAtNode(cmContainer);
      toolTip = null;
    }
    getContainer();
    toolTip = (
      <div id="fileTreeRight">
        <div className="flex w-full flex-col bg-stone-300 border-solid border-1 border-stone-200 rounded-lg pt-2 pb-2 shadow-md">
          <div
            onClick={() => {
              console.log(info.node);
            }}
          >
            {info.node.key}
          </div>
          <div
            onClick={(e: any) => handleDelete(info.node.key)}
            className="hover:bg-stone-400 pl-4 pr-4"
            id={info.node.key}
          >
            삭제하기
          </div>
          <div
            onClick={(e: any) => Createfile(info.node.key)}
            className="hover:bg-stone-400 pl-4 pr-4"
            id={info.node.key}
          >
            파일 생성하기
          </div>
          <div
            onClick={(e: any) => Createfolder(info.node.key)}
            className="hover:bg-stone-400 pl-4 pr-4"
            id={info.node.props.title}
          >
            폴더 생성하기
          </div>
        </div>
      </div>
    );

    Object.assign(cmContainer.style, {
      position: "absolute",
      left: `${info.event.pageX}px`,
      top: `${info.event.pageY}px`,
    });

    ReactDOM.render(toolTip, cmContainer);
  };

  const switcherIcon = (obj: any) => {
    if (obj.data.key?.startsWith("0-0-3")) {
      return false;
    }
    if (obj.isFolder) {
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
  const unmount = (e: any) => {
    if (toolTip != null) {
      ReactDOM.unmountComponentAtNode(cmContainer);
      toolTip = null;
    }
  };

  const Createfile = (e: any) => {
    if (toolTip != null) {
      ReactDOM.unmountComponentAtNode(cmContainer);
      toolTip = null;
    }
    getContainer();
    toolTip = (
      <div id="Tooltip">
        <div className="flex w-full flex-col bg-stone-300 border-solid border-1 border-stone-200 rounded-lg pt-2 pb-2 shadow-md">
          <input onChange={(e: any) => handleChange(e)}></input>
          <div
            onClick={(d: any) => {
              if (e[e.length - 1] !== "/") return;
              handleCreateFile(e);
            }}
            className="hover:bg-stone-400 pl-4 pr-4"
          >
            파일 생성하기
          </div>
          <div onClick={unmount} className="hover:bg-stone-400 pl-4 pr-4">
            취소하기
          </div>
        </div>
      </div>
    );

    Object.assign(cmContainer.style, {
      position: "absolute",
      left: `40%`,
      top: `40%`,
    });

    ReactDOM.render(toolTip, cmContainer);
  };
  const Createfolder = (e: any) => {
    if (toolTip != null) {
      ReactDOM.unmountComponentAtNode(cmContainer);
      toolTip = null;
    }
    getContainer();
    toolTip = (
      <div id="Tooltip">
        <div className="flex w-full flex-col bg-stone-300 border-solid border-1 border-stone-200 rounded-lg pt-2 pb-2 shadow-md">
          <input onChange={(e: any) => handleChange(e)}></input>
          <div
            onClick={(d: any) => {
              if (e[e.length - 1] !== "/") return;
              handleCreateFolder(e);
            }}
            className="hover:bg-stone-400 pl-4 pr-4"
          >
            폴더 생성하기
          </div>
          <div onClick={unmount} className="hover:bg-stone-400 pl-4 pr-4">
            취소하기
          </div>
        </div>
      </div>
    );
    Object.assign(cmContainer.style, {
      position: "absolute",
      left: `40%`,
      top: `40%`,
    });

    ReactDOM.render(toolTip, cmContainer);
  };
  const Createrootfolder = () => {
    if (toolTip != null) {
      ReactDOM.unmountComponentAtNode(cmContainer);
      toolTip = null;
    }

    getContainer();
    toolTip = (
      <div id="Tooltip">
        <div className="flex w-full flex-col bg-stone-300 border-solid border-1 border-stone-200 rounded-lg pt-2 pb-2 shadow-md">
          <input onChange={(e: any) => handleChange(e)}></input>
          <div
            onClick={(e) => handleCreaterootFolder(e)}
            className="hover:bg-stone-400 pl-4 pr-4"
          >
            폴더 생성하기
          </div>
          <div onClick={unmount} className="hover:bg-stone-400 pl-4 pr-4">
            취소하기
          </div>
        </div>
      </div>
    );
    Object.assign(cmContainer.style, {
      position: "absolute",
      left: `40%`,
      top: `40%`,
    });

    ReactDOM.render(toolTip, cmContainer);
  };

  return (
    <div className="flex flex-col overflow-hidden w-100%">
      <div
        className="flex justify-end hover:text-white"
        onClick={Createrootfolder}
      >
        +
      </div>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={{ overflow: "hidden", display: "flex" }}>
        <div style={{ display: "flex-start" }}>
          <Tree
            showLine
            allowDrop={allowDrop}
            onRightClick={onRightClick}
            selectedKeys={setting.selectedKeys}
            expandedKeys={setting.expandedKeys}
            onExpand={onExpand}
            autoExpandParent={true}
            draggable
            onDragStart={onDragStart}
            onDrop={onDrop}
            showIcon={false}
            treeData={setting.gData}
            motion={motion}
            style={{ height: "100%" }}
            onSelect={onSelect}
            switcherIcon={switcherIcon}
            virtual={true}
          ></Tree>
        </div>
      </div>
    </div>
  );
};

export default File_tree;
