import {firebase} from '@react-native-firebase/database';

const database = firebase
  .app()
  .database(
    'https://managerapp-41d45-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

export const fetchInventory = async () => {
  try {
    const snapshot = await database.ref('supplies/inventory').once('value');
    const inventory = [];
    snapshot.forEach(snapshot => {
      inventory.push({
        id: snapshot.key,
        model: snapshot.val().model,
        name: snapshot.val().name,
        quantity: snapshot.val().quantity,
        unit: snapshot.val().unit,
      });
    });
    return inventory;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
