**ticketing server api**

| Route            | Method | Body                           | Purpose                          |
|:---------------- |:------ |:------------------------------ |:-------------------------------- |
| /api/tickets     | GET    |                                | retrieve all tickets             |
| /api/tickets/:id | GET    |                                | retrieve ticket with specific ID |
| /api/tickets     | POST   | {title: string, price: string} | create a ticket                  |
| /api/tickets/:id | PUT    | {title: string, price: string} | update a ticket                  |

**run tests with Jest**
under the `ticketing/tickets` folder, run the following command:
```
npm run test
```