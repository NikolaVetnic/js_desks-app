# Notes

## 1 Database Structure

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
        "room": integer,
        "desk": integer,
        "date": Date,
        "timeFrom": Time,
        "timeTo": Time,
        "bookedBy": string (mail)
    }
```
