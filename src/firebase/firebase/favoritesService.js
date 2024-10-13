import { database } from "./firebase.js";
import { ref, set, remove, get } from "firebase/database";

export const addFavoriteNanny = async (userId, nanny) => {
  const favoriteRef = ref(database, `favorites/${userId}/${nanny.id}`);
  await set(favoriteRef, nanny);
};

export const removeFavoriteNanny = async (userId, nanny) => {
  const favoriteRef = ref(database, `favorites/${userId}/${nanny.id}`);
  await remove(favoriteRef);
};

export const getFavorites = async (userId) => {
  const favoritesRef = ref(database, `favorites/${userId}`);
  const snapshot = await get(favoritesRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};
export async function checkIfFavorite(userId, nanny) {
  try {
    const userFavoritesRef = ref(database, `favorites/${userId}/${nanny.id}`);

    const snapshot = await get(userFavoritesRef);

    return snapshot.exists();
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
}