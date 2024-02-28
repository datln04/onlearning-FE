import React from 'react'
import Styles from "./Loading.module.scss"; // Correct the import statement
import classNames from "classnames";
import loadingGif from './../../assets/images/Rhombus.gif';

export default function Loading() {
  return (
    <div className={classNames(Styles.bgLoading)}>
      <div className={Styles.loadingContent}>
        <img src={loadingGif} alt="loading" />
      </div>
    </div>
  );

}
