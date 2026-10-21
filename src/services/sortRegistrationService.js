import { collection, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'src/config/firebase-config';
import { toast } from 'react-toastify';

const COLLECTION = 'tryout_registrations';
const SHEET_WEBHOOK_URL = process.env.REACT_APP_TRYOUT_SHEET_URL;

const appendToSheet = (registration) => {
  if (!SHEET_WEBHOOK_URL) return;
  fetch(SHEET_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      ...registration,
      experience: registration.experience === 'p' ? 'כן' : 'לא',
    }),
  }).catch((e) => console.error('Error writing tryout registration to sheet:', e));
};

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

      appendToSheet({ ...payload, email: emailKey });

      return true;
    } catch (e) {
      console.error('Error creating tryout registration:', e);
      toast.error(e.message);
      return false;
    }
  },
};
