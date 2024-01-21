import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

//  NOTE: fix all ts ignores

// @ts-ignore
export const VideoJS = ({ options, onReady }) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            if (videoRef.current) {
                // @ts-ignore
                videoRef.current.appendChild(videoElement);
            }

            // @ts-ignore
            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;
            // @ts-ignore
            player.autoplay(options.autoplay);
            // @ts-ignore
            player.src(options.sources);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            // @ts-ignore
            if (player && !player.isDisposed()) {
                // @ts-ignore
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}