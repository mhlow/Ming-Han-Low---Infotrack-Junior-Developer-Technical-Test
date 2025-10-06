-- Given tables 
-- Matters(id, reference, created_at)
-- Orders(id, matter_id, created_at)
-- Certificates(id, order_id, type, created_at)

-- Query A: Return the count of certificates per matter (matter_id, certificates_count) for the last 30 days
-- https://stackoverflow.com/questions/27479856/get-last-30-day-records-from-today-date-in-sql-server (2025-06-10)
SELECT m.id AS matter_id, COUNT(c.id) AS certificates_count
FROM Matters m
INNER JOIN Orders o ON m.id = o.matter_id
INNER JOIN Certificates c ON o.id = c.order_id
WHERE DATEDIFF(day, c.created_at, GETDATE()) <= 30
GROUP BY m.id;

-- Query B: Return all matter_id that do not have a Title certificate in the last 30 days.
SELECT m.id
FROM Matters m
WHERE m.id NOT IN (
    SELECT o.matter_id 
    FROM Orders o
    INNER JOIN Certificates c ON o.id = c.order_id
    WHERE c.type = 'Title' AND DATEDIFF(day, c.created_at, GETDATE()) <= 30
)

-- Index: Propose a single useful index to speed up Query B and justify it in a short comment.
-- A possible index for a speed up could be on Certificates(type, created_at, order_id),
-- however this is a very specific index that would only be useful for a handful of queries.
-- If we know we wanted other queries that may involve date, a more useful index would be on 
-- Certificates(created_at), which would speed up any query filtering by date.
-- 
-- Depends on the other use cases of the database. 
