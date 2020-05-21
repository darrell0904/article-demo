import React from 'react';
import styles from './index.css';
export default function() {
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>
          <a href="/demo1">滚动视差 demo</a>
        </li>
        <li>
          <a href="/demo2">sticky demo1</a>
        </li>
        <li>
          <a href="/demo3">sticky demo2</a>
        </li>
        <li>
          <a href="/demo4">sticky demo3</a>
        </li>
        <li>
          <a href="/openMac">电脑翻盖动画</a>
        </li>
        <li>
          <a href="/bgAttachment">滚动视差实现</a>
        </li>
        <li>
          <a href="/canvasDraw">canvas 实现</a>
        </li>
      </ul>
    </div>
  );
}
