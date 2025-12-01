import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';
import { UserService } from './user.service';
import UserWeekStats from 'src/classes/UserWeekStats';
import  {userWeekStatsService}  from './userWeekStats.service';
import { roles } from 'src/constants/roles';
import Week from 'src/classes/Week.class';
import { defaultStatsValues } from 'src/constants/studentsTable';
import {WEEKS_COLLECTION} from 'src/constants/collectionsDB';
const create = async (newWeek) => {
  try {
    const emptyProgWeekToDb = new Week({...newWeek, programRef: ''});
    const week = await addDoc(collection(db, WEEKS_COLLECTION), {...emptyProgWeekToDb});
    const users = await UserService.getUsers();
    users
      .filter((user) => user.role === roles.member)
      .forEach(async (user) => {
        const userWeekStats = new UserWeekStats({
          weekRef: week.id,
          userRef: user.id,
          project_status: defaultStatsValues.project_status,
          presnce_status: defaultStatsValues.presnce_status,
          created_at: new Date(),
          updated_at: new Date(),
          updated_by: '',
        });
        await userWeekStatsService.create({ ...userWeekStats });
      });
    return week;
  } catch (error) {
    toast.error(error.message);
  }
};

const createByProgram = async (newWeek, program) => {
  try {
    const weekToDb = new Week({...newWeek, programRef: program});
    const week = await addDoc(collection(db, WEEKS_COLLECTION), {...weekToDb});
    const users = await UserService.getUsers(program);
    users.forEach(async (user) => {
      const userWeekStats = new UserWeekStats({
        weekRef: week.id,
        userRef: user.id,
        project_status: defaultStatsValues.project_status,
        presnce_status: defaultStatsValues.presnce_status,
        created_at: new Date(),
        updated_at: new Date(),
        updated_by: '',
      });
      await userWeekStatsService.create({ ...userWeekStats }, program);
    });
    return week;
  } catch (error) {
    toast.error(error.message);
  }
};
const get = async (id) => {
  try {
    const weekSnapshot = await getDoc(doc(db, WEEKS_COLLECTION, id));
    if (weekSnapshot.exists()) {
      const weekData = weekSnapshot.data();
      return weekData;
    } else {
      toast.error("No document found with the given ID");
      return null;
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};


const getAll = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, WEEKS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error('Failed to fetch weeks');
    console.error('Error fetching all weeks:', error);
  }
};

const getAllByProgram = async (programId) => {
  try {
    const querySnapshot = await getDocs(collection(db, WEEKS_COLLECTION));
    const weeks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return weeks.filter((week) => week.programRef === programId);
  } catch (error) {
    toast.error(error.message);
  }
};

const update = async (id, updatedWeek) => {
  try {
    await setDoc(doc(db, WEEKS_COLLECTION, id), updatedWeek);
  } catch (error) {
    toast.error(error.message);
  }
};

const remove = async (id) => {
  try {
    await deleteDoc(doc(db, WEEKS_COLLECTION, id));
  } catch (error) {
    toast.error(error.message);
  }
};

export const weekService = {
  create,
  createByProgram,
  get,
  update,
  remove,
  getAllByProgram,
  getAll,
};
