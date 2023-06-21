export const generateTimeOptions = () => {
    const options = [];
    const minuteInterval = 15;

    let time = new Date();
    time.setHours(process.env.REACT_APP_WORK_HOURS_FROM, 0, 0); // Start at 8:00 AM

    while (
        time.getHours() < process.env.REACT_APP_WORK_HOURS_TO ||
        (time.getHours() === process.env.REACT_APP_WORK_HOURS_TO &&
            time.getMinutes() === 0)
    ) {
        const formattedTime = time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        options.push(
            <option value={formattedTime} key={formattedTime}>
                {formattedTime}
            </option>
        );
        time.setMinutes(time.getMinutes() + minuteInterval);
    }

    return options;
};

export const parseTime = (time) => {
    const [hours, minutes, period] = time.split(/:|\s/);
    let hours24 = parseInt(hours, 10);
    if (period === "PM" && hours24 !== 12) {
        hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
        hours24 = 0;
    }
    return `${hours24.toString().padStart(2, "0")}:${minutes}:00`;
};

export const isNotOverlappingWithExistingInterval = (
    inputStart,
    inputEnd,
    existingStart,
    existingEnd
) => {
    const isBefore = inputStart < existingStart && inputEnd <= existingStart; // interval 0 is before interval 1
    const isAfter = inputStart >= existingEnd && inputEnd > existingEnd; // interval 0 is after interval 1

    return isBefore || isAfter;
};

export const isTimeToAfterTimeFrom = (timeFrom, timeTo) => {
    if (!timeFrom || !timeTo) {
        return true; // Skip validation if either value is missing
    }

    const timeFromValue = Date.parse(`2000-01-01T${parseTime(timeFrom)}`);
    const timeToValue = Date.parse(`2000-01-01T${parseTime(timeTo)}`);
    return timeToValue > timeFromValue;
};
