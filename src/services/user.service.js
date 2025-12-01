import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Validators } from './validators.service';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';
import {USERS_COLLECTION} from 'src/constants/collectionsDB';
const create = async ({ userCredential, first_name, last_name, role, card_id, appliciant_data }) => {
  const userDocRef = doc(db, USERS_COLLECTION, userCredential.uid);
  const userDoc = {
    first_name,
    last_name,
    role,
    card_id,
    appliciant_data,
  };

  try {
    await setDoc(userDocRef, userDoc);
    return userDoc;
  } catch (e) {
    console.error('Error in create user:', e);
    toast.error(e.message);
  }
};

const getById = async (id) => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, id);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) return null;

    return userDocSnap.data();
  } catch (e) {
    console.error('Error in get user by id:', e);
    toast.error(e.message);
  }
};

const getUsers = async (programRef) => {
  try {
    const userCollection = collection(db, USERS_COLLECTION);
    
    if (programRef) {
      const q = query(userCollection, where('appliciant_data.programRef', '==', programRef));
      const userSnapshot = await getDocs(q);
      const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return users;
    } else {
      const userSnapshot = await getDocs(userCollection);
      const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return users;
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    toast.error('Failed to fetch users');
  }
};

const updateUserProgramRef = async (userId, programRef) => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      const updatedApplicantData = {
        ...userData.appliciant_data,
        programRef: programRef,
      };

      await setDoc(userDocRef, {
        appliciant_data: updatedApplicantData,
      }, { merge: true });
    } else {
      throw new Error('User document does not exist');
    }
  } catch (error) {
    console.error('Error updating user program reference:', error);
    toast.error('Failed to update user program reference');
  }
};

export const UserService = {
  create,
  updateUserProgramRef,
  getById,
  getUsers
};
