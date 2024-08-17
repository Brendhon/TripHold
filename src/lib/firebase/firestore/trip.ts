import { Trip } from "@app/models";
import { getTripsPath } from "@utils/paths";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
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
    return users.empty ? [] : users.docs.map((doc) => doc.data() as Trip);
  } catch (error) {
    console.error("Error getting trips: ", error);
    logAnalytics("exception", error);
    return []; // Add a return statement here to handle the error case
  }
}