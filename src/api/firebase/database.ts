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
