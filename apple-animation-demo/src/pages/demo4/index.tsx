import React from 'react';
import styles from './index.css';

const Demo4 = (): JSX.Element => {
  return (
    <div className={styles.normal}>
      <h1>时间固定demo</h1>
      <div className={styles.wrapper}>
        <section>
            <h4>5月20日</h4>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
        </section>
        <section>
            <h4>5月19日</h4>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
        </section>
        <section>
            <h4>5月11日</h4>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
            </ul>
        </section>
        
      </div>
    </div>
  );
}

export default Demo4;
