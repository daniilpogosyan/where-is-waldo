import firebaseConfig from './firebase-config';

import {
  initializeApp
} from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL
} from 'firebase/storage';
import {
  getAuth
 } from 'firebase/auth';


initializeApp(firebaseConfig);

// services
const db = getFirestore();
const storage = getStorage();

const iconsCol = collection(db, 'icons');

const resultsCol = collection(db, 'results');

async function getImageUrl(folder, imgName) {
  const imgRef = await ref(storage, `${folder}/${imgName}`);
  return getDownloadURL(imgRef);
}

export async function getGamePicture(pictureId) {
  const docRef = doc(db, 'pictures', pictureId);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data()
  const imgUrl = await getImageUrl('game-pictures', data.imgName);

  return {
    targets: data.targets,
    imgUrl
  }
}

export async function getIcons() {
  const snapshot = await getDocs(iconsCol);
  const iconsData = [];

  snapshot.forEach((doc) => iconsData.push(doc.data()));
  console.log(iconsData)

  return await Promise.all(iconsData.map(async (icon) => ({
    name: icon.name,
    imgUrl: await getImageUrl('game-icons', icon.imgName),
    pictureId: icon.picture.id
  })))
}

export async function getResults(pictureId) {
  const resultsQuery = query(resultsCol,
     where('pictureId', '==', pictureId),
     orderBy('time')
     );
  const snapshot = await getDocs(resultsQuery);

  const results = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    results.push(data)
  });

  return await results;
}

// get doc-result of authenticated user on picture that has `pictureId`
export async function getResult(pictureId) {
  const currentUser = getAuth().currentUser;

  if (currentUser === null) return

  // get doc of the user's result on a particular picture
  const q = query(
    resultsCol,
    where('uid', '==', currentUser.uid),
    where('pictureId', '==', pictureId),
    limit(1)
  );
  
  const snapshot = await getDocs(q);

  return snapshot.docs[0]
}

export async function setResult({pictureId, time}) {
  const currentUser = getAuth().currentUser;

  const newData = {
    pictureId: pictureId,
    time: time,
    uid: currentUser.uid,
    username: currentUser.displayName
  };

  const existingResultDoc = await getResult(pictureId);

  //if a result doesn't exist (user hasn't played yet)
  if (!existingResultDoc) {
    try {
      await addDoc(resultsCol, newData);
      console.log('data is created.');
    }
    catch(err) {
      console.log(err);
    }
    return
  }

  // if a result exists and current time is lower than the stored one
  if (existingResultDoc.data().time > time) {
    try {
      await setDoc(existingResultDoc.ref, newData);
      console.log('data is updated.');
    }
    catch(err) {
      console.log(err)
    }
    return 
  }
}