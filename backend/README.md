### Setup Instructions
1. Clone the project repository.
    ```
    https://github.com/icebroke/Technical_Assessment_Full_Stack_Developer_1.git
    ```
2. Change the directory to the **backend** folder and install all of the packages. Use the npm or pnpm, depending on your environment setup.
    ```
    npm install or pnpm install
    ```
3. Make sure that the database configuration setup is the same as in the **.env.dev** file.
    ```
    # Database Config
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASS=""
    DB_NAME="itemDB"
    ```
4. Create the table name as **items** and the attributes as follows:
   1. **id** (Primary Key, Auto-increment).
   2. **name** (String, required, max length: 100 characters)
   3. **description** (String, optional, max length: 500 characters)
   4. **price** (Decimal, required, must be positive)
   5. **createdAt** (Timestamp, default to current timestamp)
   6. **updatedAt** (Timestamp, updated on modification)
5. Then, run the project.
    ```
    npm run dev or pnpm dev
    ```
6. If run successfully, this message shows:
    ```
    ⚡️[server]: Server is running at http://localhost:3000
    ```

### API Endpoints
1. **GET /api/items/** : Return list of all Items.
   - **Expected successfull response:**
   ```
   [
    {
        "id": 1,
        "name": "item 1",
        "description": "item number 1 dummy data",
        "price": "11.11",
        "createdAt": "2025-01-03T13:34:58.000Z",
        "updatedAt": "2025-01-05T02:57:00.000Z"
    },
    {
        "id": 2,
        "name": "Item 2",
        "description": "item number 2 qjwehkqwhekqwhe hqjwkejhqw",
        "price": "20.11",
        "createdAt": "2025-01-04T00:56:14.000Z",
        "updatedAt": "2025-01-05T04:51:46.000Z"
    },
    ...
    ]
   ```
2. **GET /api/items/[id]** : Return an Item object by Id.
   - Parameter input: **api/items/[id]**
   - Example usage: http://localhost:3000/api/items/2
   - Expected successfull response:
   ```
    {
        "id": 2,
        "name": "Item 2",
        "description": "item number 2 qjwehkqwhekqwhe hqjwkejhqw",
        "price": "20.11",
        "createdAt": "2025-01-04T00:56:14.000Z",
        "updatedAt": "2025-01-05T04:51:46.000Z"
    }
   ```
3. **POST /api/items/** : Create/Add an item.
   - Example usage: http://localhost:3000/api/items/
   - Body content format:
   ```
    {
        "name": "Item 3",
        "description": "Item 3 description",
        "price": 12.11
    }
   ```
   - Expected successfull response:
   ```
    {
        "message": "Successfully Saved.",
        "id": 15
    }
   ```
4. **PUT /api/items/[id]** : Update the Item data by Id and content.
   - Example usage: http://localhost:3000/api/items/2
   - Body content format:
   ```
    {
        "name": "Item 2",
        "description": "Item 3 description updated test.",
        "price": 12.11
    }
   ```
   - Expected successfull response:
   ```
    {
        "message": "Successfully Saved."
    }
   ```
5. **DELETE /api/items/[id]** : Delete the Item data by Id.
   - Example usage: http://localhost:3000/api/items/19
   - Expected successfull response:
   ```
    {
        "message": "Successfully Deleted."
    }
   ```

### Known Issues
- The **GET /api/items/** does not implement pagination.
- ...

### TODO
- [ ] Improve the Not Found handler
- [ ] Implement pagination
- [ ] Implement authentication