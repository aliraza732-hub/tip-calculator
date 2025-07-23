import React from "react";
import "./TipCalculator.css"; // Assuming your CSS is here
import { useSelector, useDispatch } from "react-redux";
import {
  setBill,
  setSelectedTip,
  setCustomTip,
  setNumberOfPeople,
  resetCalculator,
} from "../redux/tipCalculaotr"; // Ensure this path is correct!

const TipCalculator = () => {
  const dispatch = useDispatch();

  // Use useSelector to get state from the Redux store
  const {
    bill,
    selectedTip,
    customTip,
    numberOfPeople, // Now managed by Redux
    peopleError,    // Now managed by Redux
    tipAmountPerPerson, // Calculated and stored in Redux
    totalPerPerson,     // Calculated and stored in Redux
  } = useSelector((state) => state.tipCalculator); // 'tipCalculator' should match your store's reducer key

  const handleBillChange = (e) => {
    dispatch(setBill(e.target.value));
  };

  const handlePeopleChange = (e) => {
    dispatch(setNumberOfPeople(e.target.value));
  };

  const handleTipButtonClick = (percentage) => {
    dispatch(setSelectedTip(percentage));
  };

  const handleCustomTipChange = (e) => {
    dispatch(setCustomTip(e.target.value));
  };

  const handleReset = () => {
    dispatch(resetCalculator());
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  const tipPercentages = [5, 10, 15, 25, 50];

  // Determine if the reset button should be disabled
  const isResetDisabled =
    bill === 0 && // Changed from '' to 0 as bill state is number
    selectedTip === 0 &&
    customTip === '' &&
    numberOfPeople === 0; // Changed from '' to 0 as numberOfPeople state is number

  return (
    <main>
      <h1 className="title">
        SPLI <br /> TTER
      </h1>
      <div className="tip-container grid">
        <form onSubmit={(e) => e.preventDefault()}>
          {" "}
          {/* Prevent default form submission */}
          <div>
            <label htmlFor="billInput">Bill</label>
            <input
              type="number"
              name="bill-input"
              id="billInput"
              value={bill === 0 ? "" : bill} // Display empty string if bill is 0 for placeholder
              onChange={handleBillChange}
              placeholder="0"
            />
          </div>

          <div>
            <div className="error-container flex">
              <label htmlFor="peopleInput">Number of People</label>
              {/* Conditionally show error message */}
              <p className={`error ${peopleError ? "active" : ""}`}>
                Can't be zero
              </p>
            </div>
            <input
              type="number"
              name="number-of-people"
              id="peopleInput"
              value={numberOfPeople === 0 ? "" : numberOfPeople} // Display empty string if 0
              onChange={handlePeopleChange}
              className={peopleError ? "error-active" : ""}
              placeholder="0"
             
            />
          </div>

          <div>
            <label htmlFor="select-tip">Select tip %</label>
            <div className="grid select-buttons">
              {tipPercentages.map((percentage) => (
                <button
                  // Pass the percentage value to the handler
                  onClick={() => handleTipButtonClick(percentage)}
                  key={percentage}
                  type="button"
                  // Conditionally apply 'active' class based on Redux state
                  className={`select-tip-button ${
                    selectedTip === percentage && customTip === "" ? "active" : ""
                  }`}
                >
                  {percentage}%
                </button>
              ))}
              <input
                type="number"
                name="custom-input"
                placeholder="Custom"
                id="customInput"
                className="custom-input"
                value={customTip} // Value from Redux state
                onChange={handleCustomTipChange} // Dispatches action
              />
            </div>
          </div>
        </form>

        <div className="total-container grid">
          <div className="flex result-box">
            <div>
              <div className="flex small-total">
                <p className="total-heading">
                  Tip Amount <br /> <small>/ person</small>
                </p>
                {/* Display calculated tip from Redux state */}
                <p className="total-amount">
                  {formatCurrency(tipAmountPerPerson)}
                </p>
              </div>
              <div className="flex small-total">
                <p className="total-heading">
                  Total <br /> <small>/ person</small>
                </p>
                {/* Display calculated total from Redux state */}
                <p className="total-amount-person">
                  {formatCurrency(totalPerPerson)}
                </p>
              </div>
            </div>
            <button
              className="reset-btn"
              type="button"
              onClick={handleReset} // Dispatch reset action
              disabled={isResetDisabled} // Conditionally disable
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TipCalculator;
