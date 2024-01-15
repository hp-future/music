import useAnimation from './useAnimation';

interface AlbumSVGProps {
  /**
   * 封面
   */
  coverImgSrc: string;
}

export default function AlbumSVG(props: AlbumSVGProps) {
  useAnimation();

  const circlePosition = { cx: 200, cy: 200 };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={400} height={400} viewBox="0 0 400 400">
      <circle {...circlePosition} r={165} fill="#D7D7D7" />
      <circle {...circlePosition} r={150} fill="#1F2022" />
      <circle {...circlePosition} r={108} fill="#fff" />
      <foreignObject x={circlePosition.cx - 108} y={circlePosition.cy - 108} width={216} height={216}>
        <img
          id="musicCoverImg"
          src={props.coverImgSrc}
          alt="歌曲封面"
          width={216}
          height={216}
          style={{ borderRadius: '50%' }}
        />
      </foreignObject>
    </svg>
  );
}
