import { addDoc, collection, deleteDoc, doc, getDoc,getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';
import {PROGRAMS_COLLECTION} from 'src/constants/collectionsDB';
const create = async (newProgram) => {
  try {
    const program = await addDoc(collection(db, PROGRAMS_COLLECTION), newProgram);
    return program;
  } catch (error) {
    toast.error(error.message);
  }
};

const get = async (id) => {
  try {
    const program = await getDoc(doc(db, PROGRAMS_COLLECTION, id));
    return program;
  } catch (error) {
    toast.error(error.message);
  }
};

const getAll = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PROGRAMS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error('Failed to fetch programs');
    console.error('Error fetching all programs:', error);
  }
};

const update = async (id, updatedProgram) => {
  try {
    await setDoc(doc(db, PROGRAMS_COLLECTION, id), updatedProgram);
  } catch (error) {
    toast.error(error.message);
  }
};

const remove = async (id) => {
  try {
    await deleteDoc(doc(db, PROGRAMS_COLLECTION, id));
  } catch (error) {
    toast.error(error.message);
  }
};

export const ProgramService = {
  create,
  get,
  update,
  remove,
  getAll
};
