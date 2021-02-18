import React from 'react';
import styles from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <>
      {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
      {props.children}
    </>
  );
};

export default BasicLayout;
