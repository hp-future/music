import styles from './style.module.scss';
import { classNames } from 'src/utils';
import PauseSvg from 'src/assets/icon/pause.svg';
import React from 'react';

interface CoverImgProps {
  imgProps: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  imgBoxClassName?: string;
  /**
   * 是否展示播放量
   * @default undefined
   */
  playCount?: number;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 相对于图片位置的一些自定义的元素
   */
  children?: React.ReactNode;
}

/**
 * 封面（歌单、歌曲、歌手...）
 */
export default function CoverImg(props: CoverImgProps) {
  return (
    <div className={classNames(styles.CoverImgClassName, props.rootClassName)} style={props.rootStyle}>
      <div className={classNames(styles.imgbox, props.imgBoxClassName)}>
        <img {...props.imgProps} style={{ display: 'block', cursor: 'pointer', ...props.imgProps.style }} />
        {typeof props.playCount === 'number' ? (
          <div className={styles.playCount}>
            <PauseSvg fill="#fff" width={12} height={12} style={{ marginRight: 5 }} />
            <span>{props.playCount}</span>
          </div>
        ) : null}
        {props.children}
      </div>
      <div>{props.title}</div>
    </div>
  );
}
