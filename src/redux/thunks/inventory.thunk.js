import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '@react-native-firebase/database';
import Api_URL from '../../config/api/Api_URL';

const dataSuppliesRef = firebase.app().database(Api_URL).ref('supplies/googsReceived');

export const saveImportData = createAsyncThunk(
    'import/saveImportData',
    async (payload, { rejectWithValue }) => {
        try {
            const { date, supplier, supplieList } = payload;
            const newKey = dataSuppliesRef.push().key;
            const newSuppliesList = {};
            supplieList.forEach((supplie) => {
                const supplieKey = dbRef.child(`${newKey}/supplies`).push().key;
                newSuppliesList[supplieKey] = {
                    'model': supplie.model,
                    'name': supplie.name,
                    'unit': supplie.unit,
                    'stockinQuntity': Number(supplie.stockinQuntity),
                };
            });
            await dbRef.child(newKey).set({
                'date': date,
                'supplier': supplier,
                'supplies': newSuppliesList,
            });
            return payload;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchSupplies = createAsyncThunk('Supplies/fetchSupplies', async () => {
    try {
        const snapshot = await dataSupplies.once('value');
        const data = snapshot.val();
        const supplies = Object.keys(data || {}).map((key) => ({ id: key, ...data[key] }));
        return supplies;
    } catch (error) {
        console.log(error);
    }
});
