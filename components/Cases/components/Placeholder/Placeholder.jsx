import React from 'react';

import styles from './placeholder.module.scss';

export default function Placeholder() {
  return (
    <div className={`row ${styles.blocks}`}>
      <div className={`col-md-4 col-sm-6 col-xs-12 ${styles.block} ${styles.loading}`}>
        <div className={`${styles.placeholder} case`}>
          <div className={`${styles.imgPlaceholder} ${styles.animatedBackground}`}/>
          <div className={`${styles.textPlaceholder} ${styles.animatedBackground}`}/>
          <div className={`${styles.textPlaceholderTwo} ${styles.animatedBackground}`}/>
        </div>
      </div>
      <div className={`col-md-4 col-sm-6 col-xs-12 ${styles.block} ${styles.loading}`}>
        <div className={`${styles.placeholder} case`}>
          <div className={`${styles.imgPlaceholder} ${styles.animatedBackground}`}/>
          <div className={`${styles.textPlaceholder} ${styles.animatedBackground}`}/>
          <div className={`${styles.textPlaceholderTwo} ${styles.animatedBackground}`}/>
        </div>
      </div>
      <div className={`col-md-4 col-sm-6 col-xs-12 ${styles.block} ${styles.loading}`}>
        <div className={`${styles.placeholder} case`}>
          <div className={`${styles.imgPlaceholder} ${styles.animatedBackground}`}/>
          <div className={`${styles.textPlaceholder} ${styles.animatedBackground}`}/>
          <div className={`${styles.textPlaceholderTwo} ${styles.animatedBackground}`}/>
        </div>
      </div>
    </div>
  );
}