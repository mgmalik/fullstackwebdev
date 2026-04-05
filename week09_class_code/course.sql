-- Drop table if it already exists (to avoid conflicts)
DROP TABLE IF EXISTS course;

-- Create course table with constraints
CREATE TABLE course (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    semester INT NOT NULL,
    major ENUM('CS', 'IS', 'SE') NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY (id),
    CHECK (CHAR_LENGTH(name) >= 5),
    CHECK (semester BETWEEN 1 AND 8),
    CHECK (year BETWEEN 1 AND 4)
);

-- Insert 25 records (id is auto-generated, so we don't specify it)
INSERT INTO course (name, code, semester, major, year) VALUES
('Introduction to Programming', 'CS101', 1, 'CS', 1),
('Data Structures and Algorithms', 'CS201', 2, 'CS', 1),
('Database Management Systems', 'CS301', 3, 'CS', 2),
('Web Development Fundamentals', 'CS202', 2, 'CS', 1),
('Software Engineering Principles', 'CS401', 4, 'CS', 2),
('Object Oriented Programming', 'CS102', 1, 'CS', 1),
('Operating Systems Concepts', 'CS303', 3, 'CS', 2),
('Computer Networks', 'CS304', 3, 'CS', 2),
('Artificial Intelligence Basics', 'CS402', 4, 'CS', 2),
('Information Systems Analysis', 'IS201', 2, 'IS', 1),
('Database Design and Admin', 'IS202', 2, 'IS', 1),
('Business Intelligence', 'IS301', 3, 'IS', 2),
('System Analysis and Design', 'IS302', 3, 'IS', 2),
('Enterprise Resource Planning', 'IS401', 4, 'IS', 2),
('Information Security Mgmt', 'IS402', 4, 'IS', 2),
('IS Project Management', 'IS403', 5, 'IS', 3),
('Advanced Database Systems', 'IS501', 5, 'IS', 3),
('IT Strategy and Governance', 'IS502', 6, 'IS', 3),
('Software Development I', 'SE101', 1, 'SE', 1),
('Software Development II', 'SE102', 2, 'SE', 1),
('Software Testing and QA', 'SE201', 2, 'SE', 1),
('Software Architecture', 'SE301', 3, 'SE', 2),
('Agile Methodologies', 'SE302', 3, 'SE', 2),
('Software Project Management', 'SE401', 4, 'SE', 2),
('Advanced Software Engineering', 'SE402', 5, 'SE', 3);

-- Verify the data was inserted
SELECT COUNT(*) AS total_courses FROM course;

-- Display all records
SELECT * FROM course ORDER BY id;

-- Optional: Show constraint violations would be prevented by the database
-- Example of what WOULD NOT work (uncomment to test):
-- INSERT INTO course (name, code, semester, major, year) VALUES ('Bad', 'TEST01', 9, 'CS', 5);
-- This would fail because: name too short (4 chars), semester > 8, year > 4