import React, { useState, useEffect } from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import PlayIcon from "../../icons/play";
import styles from "./video.module.css";

export default function index({ videoID }) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [showVideo, setShowVideo] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setShowVideo(true);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let videoWidth = 0;
  let videoHeight = 0;
  if (windowSize.width && windowSize.width < 800) videoWidth = windowSize.width;
  if (windowSize.width && windowSize.width >= 800) videoWidth = 800;
  if (videoWidth) videoHeight = videoWidth * (9 / 16);

  const opts = {
    height: videoHeight,
    width: videoWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 0,
      color: "white",
      rel: 0,
      showinfo: 0,
      ecver: 2,
    },
    modestbranding: 0,
  };

  const trackUser = () => {};

  return (
    <div style={{ margin: "auto", textAlign: "center", height: `${videoHeight}px` }}>
      {!playVideo ? <CoverImage vid={videoID} height={videoHeight} width={videoWidth} setPlayVideo={setPlayVideo} /> : null}
      {showVideo && playVideo ? <YouTube videoId={videoID} opts={opts} onReady={trackUser} /> : null}
    </div>
  );
}

const CoverImage = ({ vid, height, width, setPlayVideo }) => {
  const [hover, setHover] = useState(false);
  let iconSize = 64;
  return (
    <>
      {!vid ? (
        <div className={styles.container} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <p style={{ paddingTop: `${height / 3}px` }}>Video Under Production</p>
          {/* {hover ? <PlayIcon size={iconSize} color={"ff0000"} /> : <PlayIcon size={iconSize} color={"4D4D4D"} />} */}
        </div>
      ) : (
        <div onClick={() => setPlayVideo(true)} className={styles.container} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className={styles.icon} style={{ width: `${width}px`, marginTop: (height - iconSize) / 2 }}>
            {hover ? <PlayIcon size={iconSize} color={"ff0000"} /> : <PlayIcon size={iconSize} color={"4D4D4D"} />}
          </div>

          <Image src={`https://i.ytimg.com/vi/${vid}/hq720.jpg`} height={height} width={width} />
        </div>
      )}
    </>
  );
};
