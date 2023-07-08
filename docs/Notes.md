# Notes

## 1 Front

### 1.1 Database Structure

Users (collection `users`):

```json
    {
        "password": string (hash),
        "role": string,
        "username": string (email)
    }
```

Desks (collection `desks`):

```json
    {
        "addedBy": string (email),
        "desk": integer,
        "location": string,
        "room": integer,
        "bookings": array of Booking
    }
```

Booking (array within `desks`):

```json
    {
        "location": string,
        "room": integer,
        "desk": integer,
        "date": Date,
        "timeFrom": Time,
        "timeTo": Time,
        "bookedBy": string (mail)
    }
```

### 1.2 Database Usage Tracking

Use [`../desks-front/src/utils/db/updateTotalDownloaded.js`](../desks-front/src/utils/db/updateTotalDownloaded.js) function after each database fetch request to track the amount of data downloaded. This is not equivalent to Firebase metrics (which is not even available on free plan), but is useful to indicate leaks so the app can be stopped and debugged on time.

In addition there is a backup base setup - check out [`../desks-front/src/firebase.js`](../desks-front/src/utils/db/updateTotalDownloaded.js) for details.
