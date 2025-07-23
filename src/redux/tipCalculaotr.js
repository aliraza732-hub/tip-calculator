import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bill: 0,
    selectedTip: 0, 
    customTip: '', 
    numberOfPeople: 0, 
    peopleError: false,
    tipAmountPerPerson: 0.00,
    totalPerPerson: 0.00,
};


// --- START OF FIX ---

// 1. Create a pure helper function outside the slice definition
// This function takes the 'state' (which will be an Immer draft)
// and directly modifies it. It should NOT return anything.
const calculateResultsLogic = (state) => {
    const billFloat = parseFloat(state.bill); // Ensure parsing inside the logic
    const peopleInt = parseInt(state.numberOfPeople, 10);

    // Defensive checks
    if (isNaN(billFloat) || isNaN(peopleInt) || peopleInt <= 0) {
        state.tipAmountPerPerson = 0.00;
        state.totalPerPerson = 0.00;
        return; // Exit if invalid input
    }

    let finalTipPercentage = state.selectedTip;
    if (state.customTip !== '') {
        finalTipPercentage = parseFloat(state.customTip);
    }

    if (isNaN(finalTipPercentage)) { // Handle case where customTip is not a valid number
        finalTipPercentage = 0;
    }


    const tipAmount = (billFloat * (finalTipPercentage / 100));
    const totalAmount = billFloat + tipAmount;

    state.tipAmountPerPerson = tipAmount / peopleInt;
    state.totalPerPerson = totalAmount / peopleInt;
};

// --- END OF FIX ---



const tipSlice = createSlice({
    name: 'tipCalculator',
    initialState,
    reducers: {
        setBill: (state, action) => {
            state.bill = action.payload; // Store as string initially if preferred, parse in logic
            calculateResultsLogic(state); // Call the helper function
        },
        setSelectedTip: (state, action) => {
            state.selectedTip = action.payload;
            state.customTip = '';
            calculateResultsLogic(state); // Call the helper function
        },
        setCustomTip: (state, action) => {
            state.customTip = action.payload;
            state.selectedTip = 0;
            calculateResultsLogic(state); // Call the helper function
        },
        setNumberOfPeople: (state, action) => {
            const value = action.payload; // Keep as string for input for now
            state.numberOfPeople = value;
            state.peopleError = (value === '' || parseFloat(value) === 0); // Check for empty or zero
            calculateResultsLogic(state); // Call the helper function
        },
        resetCalculator: (state) => {
            Object.assign(state, initialState);
            // After resetting, also run calculation to ensure results are 0.00
            calculateResultsLogic(state);
        },
        // The 'calculateResults' reducer is now gone, replaced by the helper function.
        // Reducers should focus on accepting actions and directly updating state or calling helpers.
    }
});

export const {
    setBill,
    setSelectedTip,
    setCustomTip,
    setNumberOfPeople,
    resetCalculator,
} = tipSlice.actions;

export default tipSlice.reducer;