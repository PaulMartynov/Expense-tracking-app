import { appDb } from "./firebase";

export const setExpCategory = async (
  userId: string,
  category: { categories: ExpCategory[] }
): Promise<ExpCategory[]> => {
  await appDb.collection("category").doc(userId).set(category, { merge: true });
  return category.categories;
};

export const getExpCategories = async (
  userId: string
): Promise<ExpCategory[]> => {
  const snap = await appDb.collection("category").doc(userId).get();
  const data = snap.data();
  if (data) {
    return data.categories;
  }
  return [];
};

export const addTransaction = async (
  userId: string,
  transaction: Transaction
): Promise<boolean> => {
  await appDb
    .collection("transactions")
    .doc(userId)
    .collection("user_transactions")
    .add(transaction);
  return true;
};

export const getAllTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const snap = await appDb
    .collection("transactions")
    .doc(userId)
    .collection("user_transactions")
    .orderBy("date")
    .get();
  return snap.docs.map((exp) => {
    return {
      ...exp.data(),
    } as Transaction;
  });
};

export const getLastNTransactions = async (
  userId: string,
  n: number
): Promise<Transaction[]> => {
  const snap = await appDb
    .collection("transactions")
    .doc(userId)
    .collection("user_transactions")
    .orderBy("date")
    .limitToLast(n)
    .get();
  return snap.docs.map((exp) => {
    return {
      ...exp.data(),
    } as Transaction;
  });
};

export const getTransactionsByDate = async (
  userId: string,
  stat: number,
  end: number
): Promise<Transaction[]> => {
  const snap = await appDb
    .collection("transactions")
    .doc(userId)
    .collection("user_transactions")
    .orderBy("date")
    .where("date", ">=", stat)
    .where("date", "<=", end)
    .get();
  return snap.docs.map((exp) => {
    return {
      ...exp.data(),
    } as Transaction;
  });
};

export const deleteTransaction = async (
  userId: string,
  uuid: string
): Promise<boolean> => {
  const snap = await appDb
    .collection("transactions")
    .doc(userId)
    .collection("user_transactions")
    .where("uuid", "==", uuid)
    .get();
  const batch = appDb.batch();
  snap.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  return true;
};
