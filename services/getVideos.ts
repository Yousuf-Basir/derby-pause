import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { Slot } from "../types/VideoList";
import { storage } from "../utils/initFirebase";

const NUMBER_OF_SLOTS: number = 4;
const MOCK_DATA = [
    {
        primaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot1%2Fslot-1-primary.webm?alt=media&token=0f8480c4-5bf3-4bf3-b604-2b8e69d8541c',
        secondaryVideo: ''
    },
    {
        primaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot2%2Fslot-2-primary.webm?alt=media&token=e540ebbd-d77a-4688-a1c6-9798590cc482',
        secondaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot2%2Fslot-2-secondary.webm?alt=media&token=c6bb4174-8558-4d56-bdf5-471f7676f040'
    },
    {
        primaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot3%2Fslot-3-primary.webm?alt=media&token=2519326c-5adf-4f81-a36e-939e5bc6af49',
        secondaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot3%2Fslot-3-secondary.webm?alt=media&token=0caee4fb-c7a7-4b2b-8f90-0c294a7f8e91'
    },
    {
        primaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot4%2Fslot-4-primary.webm?alt=media&token=5a145f02-fd09-4295-b84c-9e43ca99a87d',
        secondaryVideo: 'https://firebasestorage.googleapis.com/v0/b/tempproject-38790.appspot.com/o/derby-pause%2Fslot4%2Fslot-4-secondary.webm?alt=media&token=9216260b-6745-40d7-8bec-2a374a434c11'
    }
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
    // let videoList: Slot[] = [];

    // try {
    //     for (var i = 1; i <= NUMBER_OF_SLOTS; i++) {
    //         const primaryVideoRef = `derby-pause/slot${i}/slot-${i}-primary.webm`;
    //         const secondaryVideoRef = `derby-pause/slot${i}/slot-${i}-secondary.webm`;
    //         videoList.push({
    //             primaryVideo: await getVideoLink(primaryVideoRef),
    //             secondaryVideo: await getVideoLink(secondaryVideoRef)
    //         })
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

    // return videoList;

    return MOCK_DATA;
}