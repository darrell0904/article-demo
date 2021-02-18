import React from 'react';
import styles from './index.css';

const Demo3 = (): JSX.Element => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <nav>导航</nav>
        </div>
      </div>
      <div className={styles.flowBox}></div>
    </>
  );
}

export default Demo3;
