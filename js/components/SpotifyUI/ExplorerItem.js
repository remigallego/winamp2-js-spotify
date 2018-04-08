import React from "react";
import winampmp3 from "./images/winamp-mp3.png";
import folderclosed from "./images/folder-closed.ico";

class ExplorerItem extends React.Component {
  renderIcons(icons) {
    if (icons.length > 1) {
      return (
        <div className="explorer-item-icon--wrapper">
          <img className="explorer-item-icon--bigger" src={icons[0]} />
          <img className="explorer-item-icon--smaller" src={icons[1]} />
        </div>
      );
    }
    return (
      <div className="explorer-item-icon--wrapper">
        <img className="explorer-item-icon--bigger" src={icons[0]} />
      </div>
    );
  }

  render() {
    const {
      type,
      selected,
      onClick,
      onDoubleClick,
      children,
      image
    } = this.props;
    let thisclass = "explorer-item";
    const icons = [];

    switch (type) {
      case "track":
        icons.push(winampmp3);
        break;
      case "album":
        icons.push(folderclosed);
        icons.push(image);
        break;
      case "artist":
        icons.push(folderclosed);
        icons.push(image);
        break;
      case "image":
        icons.push(image);
        break;
      default:
        break;
    }

    if (selected) thisclass = `${thisclass} +  explorer-selected`;

    return (
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        className={thisclass}
      >
        {this.renderIcons(icons)}
        {children}
      </div>
    );
  }
}

export default ExplorerItem;
