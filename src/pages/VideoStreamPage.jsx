import React from "react";
import ReactPlayer from "react-player";

const VideoStream = props => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        src={props.hlsSrc}
        controls={true} // Hiển thị thanh điều khiển mặc định
        playing={true}
        width="100%"
        height="100%"
        config={{
          file: {
            forceHLS: true,
            hlsOptions: {
              enableWorker: true,
              lowLatencyMode: true,
            },
          },
        }}
        onError={e => console.log("HLS Error:", e)}
      />
    </div>
  );
};

export default VideoStream;
