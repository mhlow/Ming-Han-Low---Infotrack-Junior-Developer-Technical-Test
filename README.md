# Infotrack Junior Developer Technical Test
Ming Han Low

Time started: 2025-10-6 19:28:00

# Deliverables
## API + Mapping (C#/.NET 8)
All relevant files are stored in [backend](./backend) folder.

## UI - PropertyCard (React 18 + TypeScript)
All relevant files are stored in [frontend](./frontend) folder.

## SQL Task
Answer is provided in [SQL Task.md](./SQL%20Task.md).

## Tests
Unit tests for their respective parts are in their respective folders:

# Instructions to run the API and UI
## Prerequisites
- .NET 8 SDK
- Node.js (v18 or above)

## Running the API
1. Navigate to the `backend` directory
2. Restore the dependencies
3. Run the API
4. The API will be available where the console indicates.

```bash
cd backend # assuming you are in ./Ming-Han-Low---Infotrack-Junior-Developer-Technical-Test
dotnet restore
dotnet run
```

## Running the UI
1. Navigate to the `frontend` directory:
2. Install the dependencies
3. Start the React application
4. The UI will be available where the console indicates.

```bash
cd frontend # assuming you are in ./Ming-Han-Low---Infotrack-Junior-Developer-Technical-Test
npm install
npm start
```

# Time Spent

# Assumptions

# Approach and Trade-offs

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

