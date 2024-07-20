import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
  getDoc,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

export async function addDaily(data) {
  try {
    await addDoc(collection(db, "dailyastrology"), data);
    console.log("added astrology");
  } catch (e) {
    console.log(e);
  }
}

export async function editDaily(data, id) {
  try {
    await updateDoc(doc(db, "dailyastrology", id), data);
    console.log("updated astrology");
  } catch (e) {
    console.log(e);
  }
}

export async function deleteDaily(id) {
  try {
    await deleteDoc(doc(db, "dailyastrology", id));
    console.log("deleted astrology");
  } catch (e) {
    console.log(e);
  }
}

export async function getDaily() {
  try {
    let data = [];
    const q = query(collection(db, "dailyastrology"), orderBy("date", "desc"));
    const snap = await getDocs(q);
    snap.docs.map((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}