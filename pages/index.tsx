import { Box, Button, Flex } from '@chakra-ui/react'
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
    if (slotIndex+1 < videoList.length) {
      setSlotIndex((prevValue) => (prevValue + 1));
    } else {
      if(!isPauseDown) {
        setSlotIndex(0);
      }
    }
  }

  useEffect(() => {
    console.log("slotIndex", slotIndex)
    const primaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-primary`) as HTMLVideoElement;
    const secondaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-secondary`) as HTMLVideoElement;
    if (isPauseDown) {
      secondaryVideoPlayer?.play();
    } else {
      primaryVideoPlayer?.play();
    }
  }, [slotIndex])

  const handlePauseDown = () => {
    if (!videoList[slotIndex]?.secondaryVideo) {
      return;
    }

    setIsPauseDown(true);
    const primaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-primary`) as HTMLVideoElement;
    const secondaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-secondary`) as HTMLVideoElement;
    primaryVideoPlayer.pause();
    secondaryVideoPlayer.play();
  }

  const handlePauseUp = () => {
    if (!videoList[slotIndex]?.secondaryVideo) {
      return;
    }

    setIsPauseDown(false);
    const primaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-primary`) as HTMLVideoElement;
    const secondaryVideoPlayer: HTMLVideoElement = document.getElementById(`slot${slotIndex}-secondary`) as HTMLVideoElement;
    primaryVideoPlayer.play();
    secondaryVideoPlayer.pause();
  }

  return (
    <Flex
      flexDir='column'
      alignItems='center'
      height='100vh'
      overflow='hidden'
      bg='blue.200'
    >
      {
        videoList.map((slot, key) => (
          <Box
            flex='1'
            display={!isPauseDown &&  slotIndex == key ? 'block' : 'none'}>
            <video
              id={`slot${key}-primary`}
              onEnded={() => updateSlotIndex()}
              key={key}
              muted
              autoPlay
              style={{ height: '100%' }}
            >
              <source src={slot.primaryVideo} />
            </video>
          </Box>
        ))
      }

      {
        videoList.map((slot, key) => (
          <Box
            flex='1'
            alignItems='center'
            justifyContent='center'
            display={isPauseDown && slotIndex == key ? 'block' : 'none'}>
            <video
              id={`slot${key}-secondary`}
              onEnded={() => updateSlotIndex()}
              key={key}
              muted
              autoPlay
              style={{ height: '100%' }}
            >
              <source src={slot.secondaryVideo} />
            </video>
          </Box>
        ))
      }

      <Button
        height='120px'
        maxW='300px'
        className='derbyPauseButton'
        onMouseDown={handlePauseDown}
        onMouseUp={handlePauseUp}
        onTouchStart={handlePauseDown}
        onTouchEnd={handlePauseUp}
      >
        The pause button
      </Button>
    </Flex>
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