import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


export default function Calendar() {
    const [selected, setSelected] = useState(null);

  
  const unavailableDays = [
    new Date(2025, 0, 5),
    new Date(2025, 0, 12),
    new Date(2025, 0, 19)
  ];

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disabled={unavailableDays}
      />

      <div>
        {selected ? (
          <p>You selected {selected.toLocaleDateString()}.</p>
        ) : (
          <p>Please select a day.</p>
        )}
      </div>
<div>
        <input type="button" value="Confirm Booking" className="btn btn-primary"
            
        />
        

</div>

</div>
  );
}
