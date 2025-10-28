import { collection, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'src/config/firebase-config';
import { toast } from 'react-toastify';

const COLLECTION = 'tryout_registrations';

export const sortRegistrationService = {
  create: async (payload) => {
    try {

      const emailKey = (payload.email || '').trim().toLowerCase();
      if (!emailKey) {
        toast.error('חסר אימייל תקין');
        return false;
      }


      const docId = emailKey;

      const ref = doc(collection(db, COLLECTION), docId);

      
      const existing = await getDoc(ref);
      if (existing.exists()) {
        toast.error('כבר נרשמת באמצעות כתובת מייל זו');
        return false;
      }


      await setDoc(ref, {
        ...payload,
        email: emailKey,        
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
