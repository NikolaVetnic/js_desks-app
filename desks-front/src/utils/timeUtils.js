export const generateTimeOptions = (isTimeFrom) => {
    const options = [];
    const minuteInterval = 15;

    let time = new Date();
    time.setHours(process.env.REACT_APP_WORK_HOURS_FROM, 0, 0); // Start at 8:00 AM

    while (
        time.getHours() < process.env.REACT_APP_WORK_HOURS_TO ||
        (time.getHours() === parseInt(process.env.REACT_APP_WORK_HOURS_TO) &&
            time.getMinutes() === 0)
    ) {
        const formattedTime = time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        if (isTimeFrom && time.getHours() === 17 && time.getMinutes() === 0) {
            options.push(
                <option value={formattedTime} key={formattedTime} disabled>
                    {formattedTime}
                </option>
            );
        } else if (!isTimeFrom && time.getHours() === 8 && time.getMinutes() === 0) {
            options.push(
                <option value={formattedTime} key={formattedTime} disabled>
                    {formattedTime}
                </option>
            );
        } else {
            options.push(
                <option value={formattedTime} key={formattedTime}>
                    {formattedTime}
                </option>
            );
        }
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
    const isBefore = inputEnd <= existingStart; // interval 0 is before interval 1
    const isAfter = inputStart >= existingEnd; // interval 0 is after interval 1

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

export const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  export const transformTime = (timeFrom, timeTo) => {
    const [hourF, minuteF, atF] = timeFrom.split(/:|\s/);
    const [hourT, minuteT, atT] = timeTo.split(/:|\s/);
  
    const timeFromInt = parseToInteger(hourF, minuteF);
    const timeToInt = parseToInteger(hourT, minuteT);
  
    const idx0 = calculateIndex(timeFromInt.hourR, timeFromInt.minR, atF);
    const idx1 = calculateIndex(timeToInt.hourR, timeToInt.minR, atT);
    
    return [idx0, idx1];
  };

  const convertTimeTo24HourFormat = (hour, minute, at) => {
    const parsedTime = parseToInteger(hour,minute);
  
    if (at === 'PM' && parsedTime.hourR < 12) {
        parsedTime.hourR += 12;
    }
  
    if (at === 'AM' && parsedTime.hourR === 12) {
        parsedTime.hourR = 0;
    }

    return { hourR: parsedTime.hourR, minR: parsedTime.minR };
  };
  
  const calculateIndex = (hour, minute, at) => {
    const convertedTime = convertTimeTo24HourFormat(hour, minute, at);
  
    var minuteR = convertedTime.minR / 15;
  
    return (convertedTime.hourR - 8) * 4 + minuteR;
  };
  
  const parseToInteger = (hour, minute) => {
    var hourR = parseInt(hour, 10);
    var minR = parseInt(minute, 10);
  
    return { hourR, minR };
  };