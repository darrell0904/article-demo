import React, { useEffect, useRef, useState } from 'react';
import styles from './index.css';

declare global {
  interface Window {
    $: any
  }
}

const { $ } = window;

const OpenMac = (): JSX.Element => {

  let startOpen = 0;

  const [asset, setAsset] = useState(`large_0001`);

  let url = 'large_0001';

  const scrollEvent = () => {
    const scrollTop = $('html').scrollTop();

    if (scrollTop > startOpen && scrollTop < startOpen + 400) {
      let offset = Math.floor((scrollTop - startOpen) / 400 * 120);
      let newAsset = ''

      if (offset < 1) {
        offset = 1;
      } else if (offset > 120) {
        offset = 120;
      }

      console.log('---offset---', offset);

      if (offset < 10) {
        newAsset = `large_000${offset}`;
      } else if (offset < 100) {
        newAsset = `large_00${offset}`;
      } else {
        newAsset = `large_0${offset}`;
      }

      console.log('----newAsset---', newAsset);

      setAsset(newAsset);
    }

    if (scrollTop < startOpen) {
      setAsset('large_0001');
    }

    if (scrollTop > startOpen + 400) {
      setAsset('large_0120');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent, false);

    startOpen = $('#imgWrapper').offset().top - (window.innerHeight / 2 - $('#imgWrapper').height() / 2);


    scrollEvent();

    return ()=>{
      window.removeEventListener('scroll', scrollEvent, false);
    }
  }, []);

  return (
    <div className={styles.normal}>
      <div className={styles.content}>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>

      <div className={styles.stickyContainer}>
        <div className={styles.stickyWrapper}>
          <div id="imgWrapper" className={styles.imgWrapper}>
            <img
              src={require(`@/assets/${asset}.jpg`)}
              alt="图片1"
            />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
    </div>
  );
}

export default OpenMac;
