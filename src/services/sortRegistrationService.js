import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'src/config/firebase-config';
import { toast } from 'react-toastify';

const COLLECTION = 'tryout_registrations'; 

export const sortRegistrationService = {
  create: async (payload) => {
    try {
      await addDoc(collection(db, COLLECTION), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      return true;
    } catch (e) {
      console.error('Error creating tryout registration:', e);
      toast.error(e.message);
      return false;
    }
  },
};
