import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import { getVideoList } from '../services/getVideos'
import { Slot } from '../types/VideoList'

interface Props {
  videoList: Slot[]
}

export default function Home(props: Props) {
  const { videoList } = props;
  const [isPauseDown, setIsPauseDown] = useState(false);

  const primaryVideoElement = useRef<HTMLVideoElement>(null);
  const primaryVideoSourceElement = useRef<HTMLSourceElement>(null);
  const [primaryVideoIndex, setPrimaryVideoIndex] = useState(0);

  const secondaryVideoElement = useRef<HTMLVideoElement>(null);
  const secondaryVideoSourceElement = useRef<HTMLSourceElement>(null);
  const [secondaryVideoIndex, setSecondaryVideoIndex] = useState(0);

  const updatePrimaryVideoIndex = () => {
    if (primaryVideoIndex + 1 < videoList.length) {
      setPrimaryVideoIndex((prevValue) => (prevValue + 1));
    } else {
      setPrimaryVideoIndex(0);
    }
  }

  useEffect(() => {
    primaryVideoSourceElement.current
      ?.setAttribute('src', videoList[primaryVideoIndex]?.primaryVideo || '');

    secondaryVideoElement.current
      ?.setAttribute('src', videoList[primaryVideoIndex]?.secondaryVideo || '');

    primaryVideoElement.current?.load();
    primaryVideoElement.current?.play();
  }, [primaryVideoIndex])

  const handlePauseDown = () => {
    setIsPauseDown(true);
    primaryVideoElement.current?.play();
    secondaryVideoElement.current?.play();
  }

  const handlePauseUp = () => {
    setIsPauseDown(false);
  }

  return (
    <div className='homePageRoot'>
      <div className='videoContainer'>
        <video
          width='100%'
          controls
          ref={primaryVideoElement}
          onEnded={() => updatePrimaryVideoIndex()}
          className={isPauseDown && videoList[primaryVideoIndex].secondaryVideo?'hide':'show'}
        >
          <source ref={primaryVideoSourceElement} src={videoList[0].primaryVideo}></source>
        </video>

        <video
          width='100%'
          controls
          ref={secondaryVideoElement}
          onEnded={() => updatePrimaryVideoIndex()}
          className={isPauseDown && videoList[primaryVideoIndex].secondaryVideo?'show':'hide'}
          loop
        >
          <source ref={secondaryVideoSourceElement} src={videoList[0].secondaryVideo}></source>
        </video>
      </div>

      <button
        className='derbyPauseButton'
        onMouseDown={handlePauseDown}
        onMouseUp={handlePauseUp}
      >The pause button</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoList = await getVideoList();
  console.log(videoList)

  return ({
    props: {
      videoList: videoList
    }
  })
}