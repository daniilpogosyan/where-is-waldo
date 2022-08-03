import firebaseConfig from './firebase-config';

import {
  initializeApp
} from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL
} from 'firebase/storage';


initializeApp(firebaseConfig);

// services
const db = getFirestore();
const storage = getStorage();

const picsCol = collection(db, 'pictures');

async function getImageUrl(imgName) {
  const imgRef = await ref(storage, `game-pictures/${imgName}`);
  return getDownloadURL(imgRef);
}

export async function getGamePicture(name) {
  const picQuery = query(picsCol, where('name', '==', name), limit(1));
  const snapShot = await getDocs(picQuery);
  const data = snapShot.docs[0].data();

  const imgUrl = await getImageUrl(data.imgName);

  return {
    targets: data.targets,
    imgUrl
  }
}
