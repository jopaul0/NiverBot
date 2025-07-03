import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DateRangePicker({ onChange }) {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

    const [state, setState] = useState([
        {
            startDate: sevenDaysAgo,
            endDate: sevenDaysLater,
            key: 'selection',
        },
    ]);

    function handleChange(item) {
        setState([item.selection]);
        if (onChange) {
            onChange(item.selection);
        }
    }

    return (
        <DateRange
            editableDateInputs={true}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={state}
        />
    );
}
