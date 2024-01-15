import { ConfigProvider, Popover, Slider } from 'antd';
import Sound from 'src/assets/icon/sound.svg';
import Mute from 'src/assets/icon/mute.svg';
import styles from '../style.module.scss';
import { useState } from 'react';
// import playingStore from 'src/store/playingStore';

/**
 * 音量
 */
export default function SoundBar() {
  const [sound, setSound] = useState(50);
  const [lastSound, setLastSound] = useState(0);

  // const [updateSoundStore] = playingStore((state) => [state.updateSound]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            handleColor: 'var(--music-color)',
            trackBg: 'var(--music-color)',
            trackHoverBg: 'var(--music-color)',
            dotActiveBorderColor: 'var(--music-color)',
            handleSizeHover: 10,
            handleLineWidthHover: 2,
            handleActiveColor: 'var(--music-color)',
          },
          Tooltip: {
            colorBgSpotlight: 'var(--music-color)',
          },
        },
      }}
    >
      <Popover
        placement="top"
        overlayInnerStyle={{ height: 150, padding: '12px 0 18px' }}
        overlayClassName={styles.soundPopover}
        arrow={false}
        // content={<Slider value={sound} vertical onChange={setSound} onAfterChange={updateSoundStore} />}
      >
        <span
          className={styles.sound}
          title={sound ? '静音' : '恢复音量'}
          onClick={() => {
            setSound((prev) => {
              const value = prev ? 0 : lastSound;
              setLastSound(prev);
              // updateSoundStore(value);
              return value;
            });
          }}
        >
          {sound ? <Sound /> : <Mute />}
        </span>
      </Popover>
    </ConfigProvider>
  );
}
