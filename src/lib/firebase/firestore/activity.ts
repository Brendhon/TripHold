import { Activity, Trip } from "@app/models";
import { getFireActivitiesPath } from "@utils/paths";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../config";

/**
 * Get pin from last activity before current start date
 * @param {Trip} trip Trip data
 * @param {Date} currentStartDate Current start date
 * @returns {Activity} Pin data
 */
export const getLastActivity = async (trip: Trip, currentStartDate: Date): Promise<Activity | undefined> => {
  try {
    // Check if trip is set
    if (!trip.id) throw { message: "Trip ID is required" };

    // Get path
    const path = getFireActivitiesPath(trip.id);

    // Get collection
    const col = collection(db, path);

    // Get docs
    const docs = await getDocs(query(col));

    // Check if activities are empty
    if (docs.empty) return;

    // Get activities
    const activities = docs.docs.map(doc => { return { id: doc.id, ...doc.data() } as Activity });

    // Filter activities
    const filteredActivities = activities
      .filter(activity => activity.endDate) // Filter activities with end date
      .filter(activity => activity.endDate! < currentStartDate) // Filter activities before current start date
      .sort((a, b) => (a.endDate! > b.endDate!) ? -1 : 1); // Sort activities by end date

    // Get last activity
    const lastActivity = filteredActivities[0];

    // Get user data
    return lastActivity;
  } catch (error) {
    console.error("Error on fetching pin from last activity: ", error);
    return;
  }
}

/**
 * Create a new flight activity
 * @param {Activity} activity Activity
 */
export const createActivity = async (activity: Activity) => {
  // Get path
  const path = getFireActivitiesPath(activity.tripId);

  // Create activity
  const doc = await addDoc(collection(db, path), {
    ...activity,
    createdAt: new Date()
  });  

  // Return activity ID
  return doc.id;
}
