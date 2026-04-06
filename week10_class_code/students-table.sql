-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10),
    semester INT NOT NULL,
    major ENUM('CS', 'IS', 'SE') NOT NULL,
    -- Add constraints
    CONSTRAINT chk_semester CHECK (semester BETWEEN 1 AND 8)
);

-- Optional: Add comments to explain the constraints
ALTER TABLE students 
MODIFY COLUMN semester INT NOT NULL COMMENT 'Must be between 1 and 8 inclusive';

ALTER TABLE students 
MODIFY COLUMN major ENUM('CS', 'IS', 'SE') NOT NULL COMMENT 'Only CS, IS, or SE allowed';

-- Insert 30 records with Middle Eastern names
INSERT INTO students (name, gender, semester, major) VALUES
-- First 10 students
('Omar Al-Farsi', 'Male', 3, 'CS'),
('Fatima Hassan', 'Female', 5, 'IS'),
('Ahmed Al-Mansouri', 'Male', 1, 'SE'),
('Layla Abdullah', 'Female', 7, 'CS'),
('Youssef Khalil', 'Male', 2, 'IS'),
('Nour El-Din', 'Female', 4, 'SE'),
('Hassan Al-Rashid', 'Male', 6, 'CS'),
('Amina Al-Zahrani', 'Female', 8, 'IS'),
('Kareem Abbas', 'Male', 3, 'SE'),
('Mariam Al-Saud', 'Female', 5, 'CS'),

-- Next 10 students
('Abdullah Al-Otaibi', 'Male', 4, 'IS'),
('Sara Al-Malki', 'Female', 2, 'CS'),
('Mohammed Al-Ghamdi', 'Male', 7, 'SE'),
('Reem Al-Shammari', 'Female', 1, 'IS'),
('Faisal Al-Qahtani', 'Male', 6, 'CS'),
('Huda Al-Harbi', 'Female', 3, 'SE'),
('Turki Al-Dossari', 'Male', 8, 'IS'),
('Nadia Al-Anzi', 'Female', 4, 'CS'),
('Saleh Al-Zahrani', 'Male', 5, 'SE'),
('Dalia Al-Osaimi', 'Female', 2, 'IS'),

-- Final 10 students
('Khalid Al-Balawi', 'Male', 6, 'CS'),
('Rania Al-Johani', 'Female', 7, 'IS'),
('Majed Al-Subaie', 'Male', 3, 'SE'),
('Nouf Al-Qahtani', 'Female', 1, 'CS'),
('Ibrahim Al-Ahmad', 'Male', 8, 'IS'),
('Amal Al-Shahrani', 'Female', 4, 'SE'),
('Sultan Al-Dosari', 'Male', 5, 'CS'),
('Hessa Al-Mutairi', 'Female', 2, 'IS'),
('Fahad Al-Otaibi', 'Male', 6, 'SE'),
('Nawal Al-Harbi', 'Female', 3, 'CS');

-- Verify the inserted records
SELECT * FROM students;

-- Show total count
SELECT COUNT(*) as total_students FROM students;

-- Show distribution by major
SELECT 
    major,
    COUNT(*) as student_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM students), 2) as percentage
FROM students
GROUP BY major
ORDER BY major;

-- Show distribution by gender
SELECT 
    gender,
    COUNT(*) as student_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM students), 2) as percentage
FROM students
GROUP BY gender;

-- Show distribution by semester
SELECT 
    semester,
    COUNT(*) as student_count
FROM students
GROUP BY semester
ORDER BY semester;

-- Show distribution by major and gender
SELECT 
    major,
    gender,
    COUNT(*) as student_count
FROM students
GROUP BY major, gender
ORDER BY major, gender;

-- Show summary statistics
SELECT 
    'CS' as major,
    COUNT(CASE WHEN major = 'CS' THEN 1 END) as total,
    AVG(CASE WHEN major = 'CS' THEN semester END) as avg_semester,
    COUNT(CASE WHEN major = 'CS' AND gender = 'Male' THEN 1 END) as male_count,
    COUNT(CASE WHEN major = 'CS' AND gender = 'Female' THEN 1 END) as female_count
FROM students
UNION ALL
SELECT 
    'IS',
    COUNT(CASE WHEN major = 'IS' THEN 1 END),
    AVG(CASE WHEN major = 'IS' THEN semester END),
    COUNT(CASE WHEN major = 'IS' AND gender = 'Male' THEN 1 END),
    COUNT(CASE WHEN major = 'IS' AND gender = 'Female' THEN 1 END)
FROM students
UNION ALL
SELECT 
    'SE',
    COUNT(CASE WHEN major = 'SE' THEN 1 END),
    AVG(CASE WHEN major = 'SE' THEN semester END),
    COUNT(CASE WHEN major = 'SE' AND gender = 'Male' THEN 1 END),
    COUNT(CASE WHEN major = 'SE' AND gender = 'Female' THEN 1 END)
FROM students;