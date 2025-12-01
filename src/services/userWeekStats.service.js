import { addDoc, collection, deleteDoc, doc, getDoc,setDoc, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';
import UserWeekStats from 'src/classes/UserWeekStats';
import {USER_WEEKSTATS_COLLECTION} from 'src/constants/collectionsDB';
const create = async (newUserWeekStats) => {
  try {
    const userWeekStatsRef = await addDoc(collection(db, USER_WEEKSTATS_COLLECTION), newUserWeekStats);
    return userWeekStatsRef;
  } catch (error) {
    toast.error(error.message);
  }
};

const get = async (id) => {
  try {
    const userWeekStatsDoc = await getDoc(doc(db, USER_WEEKSTATS_COLLECTION, id));
    return userWeekStatsDoc.exists() ? { id, ...userWeekStatsDoc.data() } : null;
  } catch (error) {
    toast.error(error.message);
  }
};

const getAll = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USER_WEEKSTATS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error('Failed to fetch user week stats');
    console.error('Error fetching all user week stats:', error);
  }
};

const getAllByUserRef = async (userRef) => {
  try {
    const q = query(collection(db, USER_WEEKSTATS_COLLECTION), where('userRef', '==', userRef));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error('Failed to fetch user week stats by user reference');
    console.error('Error fetching user week stats by user reference:', error);
  }
};

const getAllByWeekRef = async (weekRef) => {
  try {
    const q = query(collection(db, USER_WEEKSTATS_COLLECTION), where('weekRef', '==', weekRef));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error('Failed to fetch user week stats by week reference');
    console.error('Error fetching user week stats by week reference:', error);
  }
};

const update = async (id, updatedFields) => {
  try {
    const docRef = doc(db, USER_WEEKSTATS_COLLECTION, id);
    const existingDoc = await getDoc(docRef);

    if (existingDoc.exists()) {
      const updatedDoc = {
        ...existingDoc.data(),
        ...updatedFields,
        updated_at: new Date(),
      };

      await setDoc(docRef, updatedDoc);
    } else {
      toast.error('Document does not exist');
    }
  } catch (error) {
    toast.error(error.message);
  }
};


const remove = async (id) => {
  try {
    await deleteDoc(doc(db, USER_WEEKSTATS_COLLECTION, id));
  } catch (error) {
    toast.error(error.message);
  }
};

export const userWeekStatsService = {
  create,
  get,
  getAll,
  getAllByUserRef,
  getAllByWeekRef,
  update,
  remove,
};
