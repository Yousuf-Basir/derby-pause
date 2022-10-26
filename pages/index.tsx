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

  const [slotIndex, setSlotIndex] = useState(0);

  const updateSlotIndex = () => {
    if (slotIndex < videoList.length) {
      setSlotIndex((prevValue) => (prevValue + 1));
    } else {
      setSlotIndex(0);
    }
  }

  useEffect(() => {
    const primaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-primary`) as HTMLVideoElement;
    const secondaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-secondary`) as HTMLVideoElement;
    if (isPauseDown) {
      secondaryVideoPlayer.play();
    } else {
      primaryVideoPlayer.play();
    }
  }, [slotIndex])

  const handlePauseDown = () => {
    if (!videoList[slotIndex].secondaryVideo) {
      return;
    }

    setIsPauseDown(true);
    const primaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-primary`) as HTMLVideoElement;
    const secondaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-secondary`) as HTMLVideoElement;
    primaryVideoPlayer.pause();
    secondaryVideoPlayer.play();
  }

  const handlePauseUp = () => {
    if (!videoList[slotIndex].secondaryVideo) {
      return;
    }
    
    setIsPauseDown(false);
    const primaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-primary`) as HTMLVideoElement;
    const secondaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-secondary`) as HTMLVideoElement;
    primaryVideoPlayer.play();
    secondaryVideoPlayer.pause();
  }

  return (
    <div className='homePageRoot'>
      <div className='videoContainer'>
        {
          videoList.map((slot, key) => (
            <video
              id={`slot${key}-primary`}
              className={!isPauseDown && slotIndex == key ? 'show' : 'hide'}
              onEnded={() => updateSlotIndex()}
              key={key}
              muted
              autoPlay
            >
              <source src={slot.primaryVideo} />
            </video>
          ))
        }

        {
          videoList.map((slot, key) => (
            <video
              id={`slot${key}-secondary`}
              className={isPauseDown && slotIndex == key ? 'show' : 'hide'}
              onEnded={() => updateSlotIndex()}
              key={key}
              muted
              autoPlay
            >
              <source src={slot.secondaryVideo} />
            </video>
          ))
        }
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