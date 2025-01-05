### Setup Instructions
1. Clone the project repository.
    ```
    https://github.com/icebroke/Technical_Assessment_Full_Stack_Developer_1.git
    ```
3. **Go to the backend folder first and setup that project. After finished, can continue to setup this one.**
2. Change the directory to the **frontend** folder and install all of the packages. Use the npm or pnpm, depending on your environment setup.
    ```
    npm install or pnpm install
    ```
3. Make sure that the **API URL** is point to the correct URL in **.env.dev** file.
    ```
    VITE_ITEM_API_URL="http://localhost:3000/api/items"
    ```
4. **Make sure to run the backend project.**
5. Then, run the project.
    ```
    npm run dev or pnpm dev
    ```

### Known Issues
- The **Price** input still allow the user to enter non-numeric value. But, upon the data submission have validation to check the data.
- ...