import { Trip } from "@app/models";
import { getTripsPath } from "@utils/paths";
import { addDoc, collection, getDocs, query, Timestamp, where, getDoc, doc } from "firebase/firestore";
import { db, logAnalytics } from "../config";

/**
 * Create a new user
 * @param {Trip} trip User data
 */
export const createTrip = async (trip: Partial<Trip>) => {
  try {
    // Get user path
    const path = getTripsPath();

    // Get user collection
    const col = collection(db, path);

    // Create user document
    await addDoc(col, { ...trip, createdAt: Timestamp.now() });
  } catch (error) {
    console.error("Error creating user: ", error);
    logAnalytics("exception", error);
  }
}

/**
 * Get Trips by User Id
 * @param {string} userId User Id
 * @returns {Trip[]} Trips
 */
export const getTrips = async (userId: string): Promise<Trip[]> => {
  try {
    // Path to trips collection
    const path = getTripsPath();

    // Get trips collection
    const col = collection(db, path);

    // Get trips - when user id is in array of userIds
    const users = await getDocs(query(col, where("userIds", "array-contains", userId)));

    // Get trips data
    return users.empty ? [] : users.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Trip;
    });
  } catch (error) {
    console.error("Error getting trips: ", error);
    logAnalytics("exception", error);
    return []; // Add a return statement here to handle the error case
  }
}

/**
 * Get Trip by Id
 * @param {string} id Trip Id
 * @returns {Trip | null} Trip
 */
export const getTrip = async (id: string): Promise<Trip | null> => {
  try {
    // Path to trips collection
    const path = getTripsPath();

    // Get trip reference
    const ref = doc(db, path, id);

    // Get trip by id
    const result = await getDoc(ref);

    // Get trip data
    return result.exists() ? { ...result.data(), id: result.id } as Trip : null;
  } catch (error) {
    console.error("Error getting trip: ", error);
    logAnalytics("exception", error);
    return null; // Add a return statement here to handle the error case
  }
}