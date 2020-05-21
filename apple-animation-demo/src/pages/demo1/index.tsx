import React from 'react';
import styles from './index.css';

const Demo = (): JSX.Element => {
  return (
    <div className={styles.normal}>
      {/* <section>Header</section> */}
      <section className={`${styles.gImg} ${styles.gImg1}`}>IMG1</section>
      {/* <section>Content1</section> */}
      <section className={`${styles.gImg} ${styles.gImg2}`}>IMG2</section>
      {/* <section>Content2</section> */}
      <section className={`${styles.gImg} ${styles.gImg3}`}>IMG3</section>
      {/* <section>Footer</section> */}
    </div>
  );
}

export default Demo;
