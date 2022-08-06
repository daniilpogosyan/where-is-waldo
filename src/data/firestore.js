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
  setDoc
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
const picsCol = collection(db, 'pictures');
const resultsCol = collection(db, 'results');

async function getImageUrl(folder, imgName) {
  const imgRef = await ref(storage, `${folder}/${imgName}`);
  return getDownloadURL(imgRef);
}

export async function getGamePicture(name) {
  const picQuery = query(picsCol, where('name', '==', name), limit(1));
  const snapShot = await getDocs(picQuery);
  const data = snapShot.docs[0].data();

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

export async function getResults() {
  const resultsQuery = query(resultsCol,
     where('pictureId', '==', 'd6UbKCNeBwUUo09UFCq5'),
     orderBy('time')
     );
  const snapshot = await getDocs(resultsQuery);

  const results = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    results.push({
      username: data.username,
      time: data.time
    })
  });

  return await results;
}

export async function setResult({time}) {
  const currentUser = getAuth().currentUser;

  if (currentUser === null) return

  // get doc of the user's result on a particular picture
  const q = query(
    resultsCol,
    where('uid', '==', currentUser.uid),
    where('pictureId', '==', 'd6UbKCNeBwUUo09UFCq5'),
    limit(1)
  );
  
  const newData = {
    pictureId: 'd6UbKCNeBwUUo09UFCq5',
    time: time,
    uid: currentUser.uid,
    username: currentUser.displayName
  };

  const snapshot = await getDocs(q);

  //if a result doesn't exist (user hasn't played yet)
  if (snapshot.docs.length === 0) {
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
  if (snapshot.docs.length === 1
    && snapshot.docs[0].data().time > time) {
    try {
      await setDoc(snapshot.docs[0].ref, newData);
      console.log('data is updated.');
    }
    catch(err) {
      console.log(err)
    }
    return 
  }
}