import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import { getVideoList } from '../services/getVideos'
import { Slot } from '../types/VideoList'

interface Props {
  videoList: Slot[]
}

export default function Home(props: Props) {
  const { videoList } = props;

  const primaryVideoElement = useRef<HTMLVideoElement>(null);
  const primaryVideoSourceElement = useRef<HTMLSourceElement>(null);
  const [primaryVideoIndex, setPrimaryVideoIndex] = useState(0);

  const updatePrimaryVideoIndex = () => {
    if(primaryVideoIndex+1 < videoList.length ) {
      setPrimaryVideoIndex((prevValue) => (prevValue + 1));
    } else {
      setPrimaryVideoIndex(0);
    }
  }

  useEffect(() => {
    primaryVideoSourceElement.current
          ?.setAttribute('src', videoList[primaryVideoIndex]?.primaryVideo || '');

    primaryVideoElement.current?.load();
    primaryVideoElement.current?.play();
  }, [primaryVideoIndex])

  return (
    <div>
      <video
        width='100%'
        controls
        ref={primaryVideoElement}
        onEnded={() => updatePrimaryVideoIndex()}
      >
        <source ref={primaryVideoSourceElement} src={videoList[0].primaryVideo}></source>
      </video>

      <button>The pause button</button>
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