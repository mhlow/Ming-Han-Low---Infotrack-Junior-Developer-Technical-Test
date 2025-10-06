# Infotrack Junior Developer Technical Test
Ming Han Low

Time started: 2025-10-6 19:30:00

# Deliverables
## API + Mapping (C#/.NET 8)
All relevant files are stored in [backend](./backend) folder.

## UI - PropertyCard (React 18 + TypeScript)
All relevant files are stored in [frontend](./frontend) folder.

## SQL Task
Answer is provided in [Task3.sql](./Task3.sql).

## Tests
Unit tests for their respective parts are in their respective folders

# Instructions to run the API and UI
## Prerequisites
- .NET 8 SDK
- Node.js (v18 or above)

## Running the API
1. Navigate to the `backend` directory
2. Restore the dependencies
3. Run the API
4. The API will be available where the console indicates.

```pwsh
cd backend # assuming you are in ./Ming-Han-Low---Infotrack-Junior-Developer-Technical-Test
dotnet restore
dotnet run
```

```pwsh
dotnet test
```

## Running the UI
1. Navigate to the `frontend` directory:
2. Install the dependencies
3. Start the React application
4. The UI will be available where the console indicates.

```pwsh
cd frontend # assuming you are in ./Ming-Han-Low---Infotrack-Junior-Developer-Technical-Test
npm install
npm start
```

```pwsh
npm test
```

# Time Spent
4 hours

# Assumptions

# Approach and Trade-offs
Completed SQL first since it was small and was fairly confident in the answer.

Went with a controller based approach for the API as it is what I have done before. 
For the UI, I went with a component based approach, using props to pass information.

Did not leave enough time for testing, so not very good test for backend, and
could not get any tests to work on the frontend.

Spent more time than expected on building the API, but should be easy enough to expand from here.
Spent much more time than expected on the UI, trying to get the layout right. Ended up not having enough
time to use form library I had intended to use (Zod). 

# AI Usage
## Github Copilot
## Claude (Sonnet 4.5)
> What is wrong with these two SQL queries?
> -- Query A: Return the count of certificates per matter (matter_id, certificates_count) for the last 30 days
> -- https://stackoverflow.com/questions/27479856/get-last-30-day-records-from-today-date-in-sql-server (2025-06-10)
> SELECT m.id AS matter_id, COUNT(c.id) AS certificates_count
> FROM Matters m
> INNER JOIN Orders o ON m.id = o.matter_id
> INNER JOIN Certificates c ON o.id = c.order_id
> WHERE DATEDIFF(day, c.created_at, GETDATE()) <= 30
> GROUP BY m.id;
> 
> -- Query B: Return all matter_id that do not have a Title certificate in the last 30 days.
> SELECT m.matter_id
> FROM Matters m
> WHERE m.id NOT IN (
>     SELECT o.matter_id 
>     FROM Orders o
>     INNER JOIN Certificates c ON o.id = c.order_id
>     WHERE c.type = 'Title' AND DATEDIFF(day, c.created_at, GETDATE()) <= 30
> )

Gave answers about how it should be `m.id` instead of `m.matter_id` and that queries should check for between -30 and 30 days (disregarded).

> Asked Claude to generate unit tests for both backend and frontend
Ended up not using them as they did not work properly, did my own research instead.

Could've used AI more honestly but had enough of an idea of what to do.