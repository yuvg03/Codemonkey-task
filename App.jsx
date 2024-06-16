import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const handleGuestChange = (type, operation) => {
    if (type === 'adults') {
      setAdults(operation === 'increment' ? adults + 1 : Math.max(adults - 1, 0));
    } else if (type === 'children') {
      setChildren(operation === 'increment' ? children + 1 : Math.max(children - 1, 0));
    } else if (type === 'pets') {
      setPets(operation === 'increment' ? pets + 1 : Math.max(pets - 1, 0));
    }
  };

  const calculateDays = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round((end - start) / oneDay) + 1; // Include the end date as a full day
    return diffDays;
  };

  const calculateTotal = () => {
    const numberOfDays = calculateDays(startDate, endDate);
    const extraGuests = Math.max(adults + children + pets - 8, 0);
    const total = (20000 * numberOfDays) + (extraGuests * 1000)*numberOfDays;
    return total.toLocaleString('en-IN');
  };

  const handleReserveClick = () => {
    const reservationDetails = {
      checkinDate: startDate.toISOString().split('T')[0],
      checkoutDate: endDate.toISOString().split('T')[0],
      adults: adults,
      children: children,
      pets: pets,
      price: calculateTotal(),
    };
    console.log(JSON.stringify(reservationDetails, null, 2));
  };

  const numberOfDays = calculateDays(startDate, endDate);
  const extraGuests = Math.max(adults + children + pets - 8, 0);
  const extraGuestCharge = extraGuests * 1000 * numberOfDays;

  return (
    <div className="reservation-component">
      <h2>₹20,000 /night</h2>
      <p>max 8 guests, extra guests will cost ₹1000 per head</p>
      
      <div className="date-picker">
      <label>Check-in:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          dateFormat="dd MMM yyyy"
        />
        <label>Check-out :</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd MMM yyyy"
        />
      </div>
      
      <div className="guests">
        <label>Guests</label>
        <input 
          type="text" 
          value={`${adults} adults, ${children} children, ${pets} pets`} 
          readOnly 
        />
        <div className="guest-dropdown">
          <div className="guest-counter">
            <div>
              <span>Adults</span>
              <button onClick={() => handleGuestChange('adults', 'decrement')}>-</button>
              <span>{adults}</span>
              <button onClick={() => handleGuestChange('adults', 'increment')}>+</button>
            </div>
            <div>
              <span>Children</span>
              <button onClick={() => handleGuestChange('children', 'decrement')}>-</button>
              <span>{children}</span>
              <button onClick={() => handleGuestChange('children', 'increment')}>+</button>
            </div>
            <div>
              <span>Pets</span>
              <button onClick={() => handleGuestChange('pets', 'decrement')}>-</button>
              <span>{pets}</span>
              <button onClick={() => handleGuestChange('pets', 'increment')}>+</button>
            </div>
          </div>
        </div>
      </div>
      
      <button className="reserve-button" onClick={handleReserveClick}>Reserve Now</button>
      <p className="details">₹20,000 * {numberOfDays} days</p>
      <p className="details">Extra guest charge = ₹{extraGuestCharge.toLocaleString('en-IN')}</p>
      <p className="total">Total = ₹{calculateTotal()}</p>
    </div>
  );
};

export default App;
