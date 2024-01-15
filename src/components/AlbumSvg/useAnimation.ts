import { useState, useEffect } from 'react';
import playingStore from 'src/store/playingStore';

export default function useAnimation() {
  const [coverImgAnimation, setCoverImgAnimation] = useState<Animation>();

  useEffect(() => {
    const musicCoverImgDom = document.getElementById('musicCoverImg');
    if (musicCoverImgDom) {
      const animationEffect = new KeyframeEffect(
        musicCoverImgDom,
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
        { duration: 20000, iterations: Infinity }
      );
      const animation = new Animation(animationEffect);
      setCoverImgAnimation(animation);
    }
  }, []);

  const [paused] = playingStore((state) => [state.paused]);
  useEffect(() => {
    if (paused) {
      coverImgAnimation?.pause();
    } else {
      coverImgAnimation?.play();
    }
  }, [paused]);
}
