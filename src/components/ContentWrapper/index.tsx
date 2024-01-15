import React, { CSSProperties } from 'react';
import { classNames } from 'src/utils';
import styles from './style.module.scss';

interface ContentWrapperProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * 容器，应对窗口缩放时保持特定尺寸
 */
export default function ContentWrapper(props: ContentWrapperProps) {
  return (
    <div className={classNames(styles.ContentWrapperClassName, props.className)} style={props.style}>
      {props.children}
    </div>
  );
}
