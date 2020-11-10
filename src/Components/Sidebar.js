import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item">Create Node</a>
      <a className="menu-item" href="/">
        Create Node
      </a>
      <button onClick={props.addFunction}>{props.text}</button>
    </Menu>
  );
};