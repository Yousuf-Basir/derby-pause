import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { Slot } from "../types/VideoList";
import { storage } from "../utils/initFirebase";

const NUMBER_OF_SLOTS: number = 4;
const MOCK_DATA = [
    {
      primaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot0%2Fslot0-primary.webm?alt=media&token=919ac97b-0b1e-4935-b3f4-4f8b4c9fb5a7',
      secondaryVideo: ''
    },
    {
      primaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot1%2Fslot1-primary.webm?alt=media&token=6be691d4-2386-4f40-8dba-0fd7ee3a9f88',
      secondaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot1%2Fslot1-secondary.webm?alt=media&token=4f85c104-e4f1-4c71-ae3d-392d2331ba16'
    },
    {
      primaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot2%2Fslot2-primary.webm?alt=media&token=7b59ef24-c0a2-4d0f-8455-5c7d00b8cd81',
      secondaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot2%2Fslot2-secondary.webm?alt=media&token=fb38f0f7-c163-4e6d-8b7e-bdca1c2d4325'
    },
  ]
  

const getVideoLink = async (fileRef: string): Promise<string> => {
    try {
        const storageRef = ref(storage, fileRef);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        // console.log(error);
        return "";
    }
}

export const getVideoList = async (): Promise<Slot[]> => {
    // return MOCK_DATA;

    let videoList: Slot[] = [];

    try {
        for (var i = 0; i < NUMBER_OF_SLOTS; i++) {
            const primaryVideoRef = `derby-pause/slot${i}/slot${i}-primary.webm`;
            const secondaryVideoRef = `derby-pause/slot${i}/slot${i}-secondary.webm`;
            videoList.push({
                primaryVideo: await getVideoLink(primaryVideoRef),
                secondaryVideo: await getVideoLink(secondaryVideoRef)
            })
        }
    } catch (error) {
        console.log(error);
    }

    return videoList;
}