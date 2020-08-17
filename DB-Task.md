# DB Task

## Database structure

### Event Details

| Name              | Type    |          |     |     |
| ----------------- | ------- | -------- | --- | --- |
| id                | text    |          | pk  |     |
| event_name        | text    | not null |     |     |
| event_type_id     | int     | not null |     |     |
| event_loc         | text    | not null |     |     |
| event_description | text    |          |     |     |
| event_date        | Date    | not null |     |     |
| start_time        | Date    |          |     |     |
| end_time          | Date    |          |     |     |
| event_cost        | Decimal |          |     |     |

### Event Status

| Name                  | Type |          |     |                               |
| --------------------- | ---- | -------- | --- | ----------------------------- |
| id                    | text |          | pk  |                               |
| event_id              | int  | not null |     |                               |
| max_user_count        | int  | not null |     |                               |
| registered_user_count | int  | not null |     |                               |
| event_status          | text | not null |     | FULL, OPEN, CANCELLED, PAUSED |

### Event Type

| Name            | Type |          |     |                   |
| --------------- | ---- | -------- | --- | ----------------- |
| id              | text |          | pk  |                   |
| event_type_name | text | not null |     | TECH, SPORTS etc. |

### User Details

| Name         | Type  |          |     |
| ------------ | ----- | -------- | --- |
| id           | text  |          | pk  |
| name         | text  | not null |     |
| email        | email | not null |     |
| password     | text  | not null |     |
| user_type_id | text  | not null |     |

### User Type

| Name      | Type |          |     |                             |
| --------- | ---- | -------- | --- | --------------------------- |
| id        | text |          | pk  |                             |
| type_name | text | not null |     | ADMIN, USER, ORGANIZER etc. |

### User Event Details

| Name                 | Type |          |     |                                   |
| -------------------- | ---- | -------- | --- | --------------------------------- |
| id                   | text |          | pk  |                                   |
| event_id             | int  | not null |     |                                   |
| user_id              | int  | not null |     |                                   |
| event_booking_status | text | not null |     | IN PROGRESS, CONFIRMED, CANCELLED |

### User Payment Details

| Name           | Type    |          |     |                                                                                     |
| -------------- | ------- | -------- | --- | ----------------------------------------------------------------------------------- |
| id             | text    |          | pk  |                                                                                     |
| event_id       | int     | not null |     |                                                                                     |
| user_id        | int     | not null |     |                                                                                     |
| cost           | decimal |          |     |                                                                                     |
| amount_paid    | decimal |          |     |                                                                                     |
| payment_status | text    | not null |     | PAYMENT_IN_PROGRESS, FULLY_PAID, PARTIALLY_PAID, REFUND_IN_PROGRESS, REFUNDED, FREE |

#### Every table has column created_at and updated_at with type Date

#### Id is value which can uniquely identify each row

#### We will also maintain the history of records for two tables, User Event Details and User Payment Details, to keep track of user flow

## Database flow for event registration

1. One user can register for more than one event

2. Once registered for the event, there will be entries in three tables

    - one in **User Event Details** with booking status IN_PROGRESS.
    - another one in **User Payment Details** with payment status as PAYMENT_IN_PROGRESS
    - in **Event Status**, registered_user_count will be increased and event_status will be changed to FULL from OPEN (if max_user_count = registered_user_count)

3. Assuming the case that payment is successful, amount_paid will be updated in **User Payment Details** and then remaining amount to be paid will be calculated to determine next steps

4. In case of partial payments

    - one table will be updated
        - in **User Payment Details** payment_status will be changed to PARTIALLY_PAID from PAYMENT_IN_PROGRESS
    - reminders will be send to complete payment (via sms, mail etc.)
    - if the payment is note made 24 hours before the event, user's registration will be cancelled (**see cancellation flow**)

5. In case of full payment (or when partial payment is completed), there will be entries in two tables

    - in **User Event Details**, event_booking_status will be changed to CONFIRMED from IN PROGRESS
    - in **User Payment Details**, payment_status will be changed to FULLY_PAID

## Database flow for registration cancellation and refund

1. if registration is cancelled by Admin because the partial payment wasn't completed in stipulated time, there will be entries in three tables

    - in **User Event Details**, event_booking_status will be changed to CANCELLED from IN PROGRESS
    - in **User Payment Details**, payment_status will be changed to REFUND_IN_PROGRESS from PARTIALLY_PAID
    - in **Event Status**, registered_user_count will be decreased and event_status will be changed to OPEN from FULL (if it was FULL)

2. if registration is cancelled by the user after making full payment, there will be entries in two/three tables

    - in **User Event Details**, event_booking_status will be changed to CANCELLED from IN PROGRESS
    - if registration is cancelled at least 24 hours before the event, then in **User Payment Details**, payment_status will be changed to REFUND_IN_PROGRESS from PARTIALLY_PAID, otherwise no refunds will be processed
    - in **Event Status**, registered_user_count will be decreased and event_status will be changed to OPEN from FULL (if it was FULL)

3. Assuming the refund was successful, a webhook call is made to update the payment_status to REFUNDED in **User Payment Details**.

## Database flow for registration transfer

1. If an user wants to transfer its registration from one event (E1) to another event (E2), there will be entries in following tables
    - in **User Event Details**, event_id will be updated (E2)
    - in **User Payment Details**, event_id and cost will be updated (E2)
    - in **User Payment Details**, payment_status will be updated to one of the following values FULLY_PAID, PARTIALLY_PAID, REFUND_IN_PROGRESS depending upon the difference between cost and amount_paid
    - for E1, in **Event Status**, registered_user_count will be decreased and event_status will be changed to OPEN from FULL (if it was FULL)
    - for E2, in **Event Status**, registered_user_count will be increase and event_status will be changed to FULL from OPEN (if max_user_count = registered_user_count)
