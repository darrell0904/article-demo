import React, { useEffect, useRef, useState } from 'react';
import styles from './index.css';
import asset1 from '@/assets/mac1.jpg';
import asset2 from '@/assets/mac2.jpg';

declare global {
  interface Window {
    $: any
  }
}

const { $ } = window;

const CANVAS_WIDTH = 544;
const CANVAS_HEIGHT = 341;
const ZOOM_SCROLL_RANGE = 400;

const IMG_NATURAL_WIDTH = 2048;
const IMG_NATURAL_HEIGHT = 1024;


interface drawImageProps {
  img1: any;
  img2: any;
  secTop: number;
}

const CanvasDraw = (): JSX.Element => {

  let canvasRef: any = useRef();

  let NewStartScale = 0;
  let StartScale = 0;

  let image1: any = null;
  let image2: any = null;

  // scalaRadio
  const scaleRadio = window.innerHeight / CANVAS_HEIGHT;


  const scrollEvent = () => {
    const scrollTop = $('html').scrollTop();
    let curScale = scaleRadio;
    let translate = -scaleRadio * 18;

    console.log('---NewStartScale---', NewStartScale);
    console.log('---scrollTop---', scrollTop);


    if (!NewStartScale || !StartScale)  return;


    curScale = scaleRadio - ((scaleRadio - 1) / ZOOM_SCROLL_RANGE) * (scrollTop + scaleRadio * 18 - NewStartScale);


    if (curScale > scaleRadio) {
      curScale = scaleRadio;
    } else if (curScale < 1) {
      curScale = 1;
    }

    // 从 scaleRadio * 18 开始
    // all = scaleRadio * 18 + StartScale
    // 滑动过程中不断相加
    translate = -scaleRadio * 18 + ((scrollTop + scaleRadio * 18 - NewStartScale) / ZOOM_SCROLL_RANGE * (scaleRadio * 18 + StartScale));


    if (translate > StartScale) {
      translate = StartScale;
    } else if (translate < -scaleRadio * 18) {
      translate = - scaleRadio * 18;
    }

    if (image1 && image2) {
      if (curScale === scaleRadio) {
        drawImage({
          img1: image1,
          img2: image2,
          secTop: CANVAS_HEIGHT * (scrollTop + 18 * scaleRadio - NewStartScale) / window.innerHeight,
        });
      } else {
        drawImage({
          img1: image1,
          img2: image2,
          secTop: 0,
        });
      }
    }

    $('#img-wrapper').css({
      transform: `matrix(${curScale}, 0, 0, ${curScale}, 0, ${translate})`,
    });
  };

  const loadImageAsync = (url: string) => {
    return new Promise(function(resolve, reject) {
      const image = new Image();

      image.onload = function() {
        resolve(image);
      };

      image.onerror = function() {
        reject(new Error('Could not load image at ' + url));
      };

      image.src = url;
    });
  }

  const loadAllImg = () => {
    Promise.all([loadImageAsync(asset1), loadImageAsync(asset2)])
      .then(res => {
        const img1: any = res[0];
        const img2: any = res[1];

        image1 = img1;
        image2 = img2;

        drawImage({
          img1: img1,
          img2: img2,
          secTop: CANVAS_HEIGHT,
        });

      }).catch(err => {
        console.log('--err---', err);
      })
  }

  function drawImage(item: drawImageProps) {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(item.img1, 0, 0, IMG_NATURAL_WIDTH, IMG_NATURAL_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.drawImage(item.img2, 0, -item.secTop * IMG_NATURAL_HEIGHT / CANVAS_HEIGHT, IMG_NATURAL_WIDTH, IMG_NATURAL_HEIGHT, 0, -item.secTop, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent, false);

    NewStartScale = $('#section-sticky-hero').offset().top + window.innerHeight;
    StartScale = window.innerHeight / 2 - $('#img-wrapper').height() / 2;

    scrollEvent();

    return ()=>{
      window.removeEventListener('scroll', scrollEvent, false);
    }
  }, []);

  useEffect(() => {
    const canvasNode = canvasRef.current;

    if (canvasNode) {
      canvasNode.width = CANVAS_WIDTH;
      canvasNode.height = CANVAS_HEIGHT;
      loadAllImg();
    }

  }, [canvasRef, NewStartScale, StartScale, loadAllImg]);

  return (
    <>
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

      <div id="section-sticky-hero" className={styles.stickyContainer}>
        <div className={styles.componentContainer}>
          <div className={styles.imgWrapper} id="img-wrapper">
            <canvas ref={canvasRef} id="canvas" className={styles.canvas}></canvas>
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
    </>
  );
}

export default CanvasDraw;
