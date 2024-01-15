import styles from './style.module.scss';
import PlaySvg from 'src/assets/icon/play.svg';
import PauseSvg from 'src/assets/icon/pause.svg';
import PrevSvg from 'src/assets/icon/prev.svg';
import NextSvg from 'src/assets/icon/next.svg';
import { classNames } from 'src/utils';
import LyricSvg from 'src/assets/icon/lyric.svg';
import DeleteSvg from 'src/assets/icon/delete.svg';
import React, { useEffect, useState } from 'react';
import { Slider, ConfigProvider, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import playingStore from 'src/store/playingStore';
import { useUpdateEffect } from 'ahooks';
import moment from 'moment';

export default function Player() {
  const [music, paused, musicCurrentTime, updateCurrentTime, updatePaused, prev, next] = playingStore((state) => [
    state.music,
    state.paused,
    state.currentTime,
    state.updateCurrentTime,
    state.updatePaused,
    state.prev,
    state.next,
  ]);

  const [audioDom, setAudioDom] = useState<HTMLAudioElement>(null);

  // 歌曲暂停/播放
  useUpdateEffect(() => {
    if (music) {
      if (paused) {
        audioDom.pause();
      } else {
        audioDom.play();
      }
    }
  }, [paused]);

  const [sliderValue, setSliderValue] = useState(0);
  // 播放进度
  const [currentTime, setCurrentTime] = useState(0);
  const onTimeUpdate = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLAudioElement;
    setCurrentTime(target.currentTime * 1000);
    setSliderValue((currentTime * 100) / music?.dt);
  };

  // 播放按钮样式类名
  const btnClassName = (className = '') => classNames(styles.btn, className, music ? '' : styles.disabled);

  // 初始化时
  useEffect(() => {
    updatePaused(true);
    if (audioDom && musicCurrentTime) {
      audioDom.currentTime = musicCurrentTime;
    }
    return () => {
      updateCurrentTime(currentTime);
    };
  }, []);

  return (
    <div className={styles.player}>
      <audio
        ref={setAudioDom}
        src={music?.url || undefined}
        id="audio"
        onTimeUpdate={onTimeUpdate}
        onEnded={() => updatePaused(true)}
      />
      <div className={styles.btns}>
        {/* <div className={btnClassName} title="垃圾桶">
          <DeleteSvg />
        </div> */}
        <div className={btnClassName(styles.next)} title="上一首" onClick={() => prev()}>
          <PrevSvg width={12} height={12} />
        </div>
        <div
          className={btnClassName(styles.play)}
          title={paused ? '播放' : '暂停'}
          onClick={() => {
            if (music) {
              if (music.damageMsg) {
                notification.config({ maxCount: 1 });
                notification.error({
                  message: '系统提示',
                  icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
                  description: music.damageMsg,
                  placement: 'bottomRight',
                });
              } else {
                updatePaused();
              }
            }
          }}
        >
          {paused ? <PauseSvg style={{ marginLeft: 3 }} /> : <PlaySvg />}
        </div>
        <div className={btnClassName(styles.next)} title="下一首" onClick={() => next()}>
          <NextSvg width={12} height={12} />
        </div>
        {/* <div className={btnClassName} title="打开歌词">
          <LyricSvg width={20} height={20} />
        </div> */}
      </div>
      <div className={styles.progress}>
        {music ? <span className={styles.time}>{moment(currentTime).format('mm:ss')}</span> : null}

        <ConfigProvider
          theme={{
            components: {
              Slider: {
                handleColor: 'var(--music-color)',
                trackBg: 'var(--music-color)',
                trackHoverBg: 'var(--music-color)',
                dotActiveBorderColor: 'var(--music-color)',
                handleSize: 5,
                handleSizeHover: 5,
                handleLineWidthHover: 2,
                handleActiveColor: 'var(--music-color)',
                dotBorderColor: 'var(--music-color)',
              },
            },
          }}
        >
          <Slider
            className={styles.progressBar}
            tooltip={{ open: false }}
            disabled={!music}
            step={0.5}
            value={sliderValue}
            onAfterChange={(value: number) => {
              audioDom.currentTime = ((value / 100) * music.dt) / 1000;
              setCurrentTime(audioDom.currentTime * 1000);
            }}
            onChange={setSliderValue}
          />
        </ConfigProvider>

        {music ? <span className={styles.time}>{moment(music.dt).format('mm:ss')}</span> : null}
      </div>
    </div>
  );
}
