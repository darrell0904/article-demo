import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './index.css';

declare global {
  interface Window {
    $: any
  }
}

const { $ } = window;

const CANVAS_WIDTH = 544;
const CANVAS_HEIGHT = 341;

const WRAPPER_WIDTH = 694;
const WRAPPER_HEIGHT = 408;

const ZOOM_SCROLL_RANGE = 400;

const BgAttachment = (): JSX.Element => {

  const [fixImg, setFixImg] = useState(false);

  let imgFixFixed = 0;
  let StartScale = 0;

  // scalaRadio
  const scaleRadio = window.innerHeight / CANVAS_HEIGHT;

  const scrollEvent = () => {
    const scrollTop = $('html').scrollTop();
    let curScale = scaleRadio;
    let translate = -scaleRadio * 18;

    if (!imgFixFixed || !StartScale) {
      return;
    }


    if (scrollTop > imgFixFixed - 10 && scrollTop < imgFixFixed + window.innerHeight) {
      setFixImg(true);
      $('#g-img2').css({
        width: scaleRadio * CANVAS_WIDTH,
        height: scaleRadio * CANVAS_HEIGHT,
      });

      $('#img-wrapper').css({
        "width": scaleRadio * WRAPPER_WIDTH,
        "height": scaleRadio * WRAPPER_HEIGHT,
      });
    } else {
      setFixImg(false);
    }


    curScale = scaleRadio - ((scaleRadio - 1) / ZOOM_SCROLL_RANGE) * (scrollTop - imgFixFixed - window.innerHeight);


    if (curScale > scaleRadio) {
      curScale = scaleRadio;
    } else if (curScale < 1) {
      curScale = 1;
    }

    // StartScale = window.innerHeight / 2 - $('#img-wrapper').height() / curScale / 2 ;

    console.log('---StartScale-1111--', StartScale);

    // 从 scaleRadio * 18 开始
    // all = scaleRadio * 18 + StartScale
    // 滑动过程中不断相加
    translate = -scaleRadio * 18 + ((scrollTop - imgFixFixed - window.innerHeight) / ZOOM_SCROLL_RANGE * (scaleRadio * 18 + StartScale));


    if (translate > 190.5) {
      translate = 190.5;
    } else if (translate < -scaleRadio * 18) {
      translate = - scaleRadio * 18;
    }

    $('#g-img2').css({
      width: curScale * CANVAS_WIDTH,
      height: curScale * CANVAS_HEIGHT,
      "margin-top": `${translate + 18 * curScale}px`,
    });

    // 	console.log('---123---');

    $('#img-wrapper').css({
      "width": scaleRadio * WRAPPER_WIDTH,
      "height": scaleRadio * WRAPPER_HEIGHT,
      "background-size": `${curScale * WRAPPER_WIDTH}px ${curScale * WRAPPER_HEIGHT}px`,
      "background-position": `center ${translate}px`,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent, false);

    imgFixFixed = $('#g-img').offset().top;
    StartScale = window.innerHeight / 2 - $('#img-wrapper').height() / 2;

    scrollEvent();

    return ()=>{
      window.removeEventListener('scroll', scrollEvent, false);
    }
  }, []);


  return (
    <div className={styles.root}>
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

      <section id="g-img" className={`${styles.gImg} ${styles.gImg1} ${fixImg ? styles.fixed : ''}`}>IMG1</section>

      <div className={styles.stickyContainer}>
        <div className={styles.componentContainer}>
          <div className={styles.imgWrapper} id="img-wrapper">
            <section id="g-img2" className={`${styles.gImg} ${styles.gImg2} ${fixImg ? styles.fixed : ''}`}>IMG2</section>
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
      </div>
    </div>
  );
}

export default BgAttachment;
