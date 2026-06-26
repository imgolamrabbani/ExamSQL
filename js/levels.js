/* ════════════════════════════════════════════════════════════
   DATABASE SETUPS (Templates for past papers and syllabus topics)
════════════════════════════════════════════════════════════ */
const DB_ECOM = `
CREATE TABLE Customers(CustomerID INTEGER PRIMARY KEY,Customer_Name TEXT,PhoneNo TEXT,Email TEXT,CustomerAddress TEXT);
CREATE TABLE Products(ProductID INTEGER PRIMARY KEY,Product_Name TEXT,Description TEXT,Category TEXT,Product_Price REAL,StockQuantity INTEGER);
CREATE TABLE Orders(OrderID INTEGER PRIMARY KEY,CustomerID INTEGER,OrderDate TEXT);
CREATE TABLE OrderDetails(OrderID INTEGER,ProductID INTEGER,Quantity INTEGER,PRIMARY KEY(OrderID,ProductID));
CREATE TABLE Payments(PaymentID INTEGER PRIMARY KEY,OrderID INTEGER,PaymentDate TEXT,Amount REAL,Payment_Method TEXT);
INSERT INTO Customers VALUES(1,'Ahmed Rahman','01711111111','ahmed@mail.com','Rajshahi'),(2,'Fatema Begum','01722222222','fatema@mail.com','Dhaka'),(3,'Karim Hassan','01733333333','karim@mail.com','Rajshahi'),(4,'Nadia Islam','01744444444','nadia@mail.com','Chittagong'),(5,'Rahim Uddin','01755555555','rahim@mail.com','Rajshahi'),(6,'Sadia Khan','01766666666','sadia@mail.com','Sylhet'),(7,'Tariq Hossain','01777777777','tariq@mail.com','Dhaka'),(8,'Umme Habiba','01788888888','umme@mail.com','Rajshahi');
INSERT INTO Products VALUES(1,'Laptop Pro','High performance','Electronics',75000,15),(2,'Phone X','Latest smartphone','Electronics',45000,30),(3,'Wireless Headphones','Noise cancelling','Electronics',8000,0),(4,'Office Chair','Ergonomic','Furniture',12000,8),(5,'Study Table','Wooden','Furniture',9500,0),(6,'Python Book','Learn Python','Books',850,50),(7,'SQL Mastery','SQL guide','Books',650,45),(8,'USB Hub','7-port USB 3.0','Electronics',2500,22),(9,'Gaming Mouse','Precision mouse','Electronics',3500,12),(10,'Desk Lamp','LED lamp','Furniture',2200,0);
INSERT INTO Orders VALUES(101,1,'2026-01-15'),(102,2,'2026-02-20'),(103,1,'2026-03-10'),(104,3,'2026-03-25'),(105,4,'2026-04-05'),(106,2,'2026-05-12'),(107,5,'2026-06-01');
INSERT INTO OrderDetails VALUES(101,1,1),(101,6,2),(102,2,1),(102,3,1),(103,8,1),(104,7,1),(105,4,1),(106,1,1),(107,9,2);
INSERT INTO Payments VALUES(1001,101,'2026-01-15',76700,'bKash'),(1002,102,'2026-02-20',53000,'Visa'),(1003,103,'2026-03-10',2500,'Cash'),(1004,104,'2026-03-25',650,'Nagad'),(1005,105,'2026-04-05',12000,'Visa'),(1006,106,'2026-05-12',75000,'bKash');
`;

const DB_UNI = `
CREATE TABLE department(dept_name TEXT PRIMARY KEY,building TEXT,budget REAL);
CREATE TABLE instructor(ID INTEGER PRIMARY KEY,name TEXT,dept_name TEXT,salary REAL);
CREATE TABLE student(ID INTEGER PRIMARY KEY,name TEXT,dept_name TEXT,tot_cred INTEGER);
CREATE TABLE course(course_id TEXT PRIMARY KEY,title TEXT,dept_name TEXT,credits INTEGER);
CREATE TABLE takes(ID INTEGER,course_id TEXT,sec_id INTEGER,semester TEXT,year INTEGER,grade TEXT,PRIMARY KEY(ID,course_id,sec_id,semester,year));
CREATE TABLE teaches(ID INTEGER,course_id TEXT,sec_id INTEGER,semester TEXT,year INTEGER,PRIMARY KEY(ID,course_id,sec_id,semester,year));
INSERT INTO department VALUES('CSE','Tech Building',500000),('Physics','Science Hall',350000),('Math','Main Building',300000),('Music','Arts Center',150000),('EEE','Engineering Block',400000),('Biology','Bio Lab',250000),('History','Humanities',200000),('Finance','Commerce Block',300000);
INSERT INTO instructor VALUES(10101,'Srinivasan','CSE',95000),(12121,'Wu','Finance',90000),(15151,'Mozart','Music',40000),(22222,'Einstein','Physics',95000),(32343,'El Said','History',60000),(33456,'Gold','Physics',87000),(45565,'Katz','CSE',75000),(58583,'Califieri','History',62000),(76543,'Singh','Finance',80000),(76766,'Crick','Biology',72000),(83821,'Brandt','CSE',92000),(98345,'Kim','EEE',80000),(11223,'Handel','Music',48000),(44444,'Rosenberg','Music',38000);
INSERT INTO student VALUES(128,'Zhang','CSE',102),(12345,'Shankar','CSE',32),(19991,'Brandt','History',80),(23121,'Chavez','Finance',110),(44553,'Peltier','Physics',56),(45678,'Levy','Physics',46),(54321,'Williams','CSE',54),(55739,'Sanchez','Music',38),(70557,'Snow','Physics',0),(76543,'Brown','CSE',58),(76653,'Aoi','EEE',60),(98765,'Bourikas','EEE',98),(98988,'Tanaka','Biology',120);
INSERT INTO course VALUES('BIO-101','Intro. to Biology','Biology',4),('CS-101','Intro. to CS','CSE',4),('CS-315','Database Systems','CSE',3),('CS-347','Fundamentals of DB','CSE',3),('EE-181','Digital Systems','EEE',3),('FIN-201','Investment Banking','Finance',3),('HIS-351','World History','History',3),('MU-199','Music Video Production','Music',3),('PHY-101','Physical Principles','Physics',4);
INSERT INTO takes VALUES(128,'CS-101',1,'Fall',2024,'A'),(128,'CS-347',1,'Fall',2024,'A-'),(12345,'CS-101',1,'Fall',2023,'C'),(12345,'CS-315',1,'Spring',2024,'A'),(12345,'CS-347',1,'Fall',2024,'A'),(19991,'HIS-351',1,'Spring',2024,'B'),(23121,'FIN-201',1,'Spring',2024,'C+'),(44553,'PHY-101',1,'Fall',2023,'B-'),(45678,'CS-101',1,'Fall',2023,'F'),(45678,'CS-315',1,'Spring',2024,'B'),(54321,'CS-101',1,'Fall',2023,'A-'),(55739,'MU-199',1,'Spring',2024,'A'),(76543,'CS-101',1,'Fall',2023,'A'),(76543,'CS-315',1,'Spring',2024,'A'),(76653,'EE-181',1,'Spring',2024,'C'),(98765,'CS-101',1,'Fall',2023,'C-'),(98988,'BIO-101',1,'Summer',2023,'A');
INSERT INTO teaches VALUES(10101,'CS-101',1,'Fall',2024),(10101,'CS-315',1,'Spring',2024),(10101,'CS-347',1,'Fall',2024),(12121,'FIN-201',1,'Spring',2024),(15151,'MU-199',1,'Spring',2024),(22222,'PHY-101',1,'Fall',2023),(33456,'PHY-101',1,'Fall',2024),(45565,'CS-101',1,'Spring',2024),(76543,'HIS-351',1,'Spring',2024),(98345,'EE-181',1,'Spring',2024);
`;

const DB_EMP = `
CREATE TABLE employee(person_name TEXT PRIMARY KEY,street TEXT,city TEXT);
CREATE TABLE works(person_name TEXT,company_name TEXT,salary REAL,PRIMARY KEY(person_name,company_name));
CREATE TABLE company(company_name TEXT PRIMARY KEY,city TEXT);
CREATE TABLE manages(person_name TEXT PRIMARY KEY,manager_name TEXT);
INSERT INTO company VALUES('XYZ Co.','Dhaka'),('ABC Corp','Chittagong'),('Tech Ltd','Dhaka'),('First Bank Corporation','Main City');
INSERT INTO employee VALUES('John Smith','42 Main St','Main City'),('Maria Garcia','15 Oak Ave','Main City'),('David Lee','8 Park Rd','Chittagong'),('Sarah Johnson','100 Tech Blvd','Dhaka'),('Ahmed Khan','55 River Rd','Main City'),('Lisa Wong','77 Central Ave','Dhaka'),('Bob Chen','23 Lake Dr','Chittagong'),('Alice Brown','66 Hill St','Main City');
INSERT INTO works VALUES('John Smith','XYZ Co.',15000),('Maria Garcia','XYZ Co.',18000),('David Lee','ABC Corp',22000),('Sarah Johnson','Tech Ltd',35000),('Ahmed Khan','XYZ Co.',12000),('Lisa Wong','Tech Ltd',42000),('Bob Chen','ABC Corp',19000),('Alice Brown','First Bank Corporation',28000);
INSERT INTO manages VALUES('John Smith','Maria Garcia'),('David Lee','Bob Chen'),('Sarah Johnson','Lisa Wong'),('Ahmed Khan','John Smith'),('Alice Brown','Ahmed Khan');
`;

const DB_INS = `
CREATE TABLE Person(driver_id TEXT PRIMARY KEY,name TEXT,address TEXT);
CREATE TABLE Car(license TEXT PRIMARY KEY,model TEXT,year INTEGER);
CREATE TABLE Accident(report_no TEXT PRIMARY KEY,date TEXT,location TEXT);
CREATE TABLE Owner(driver_id TEXT,license TEXT,PRIMARY KEY(driver_id,license));
CREATE TABLE Participated(driver_id TEXT,report_no TEXT,car TEXT,damage_amount REAL,PRIMARY KEY(driver_id,report_no));
INSERT INTO Person VALUES('D001','John Smith','123 Main St'),('D002','Jane Doe','456 Oak Ave'),('D003','Bob Wilson','789 Pine Rd'),('D004','Alice Johnson','321 Elm St');
INSERT INTO Car VALUES('YJK-100','Toyota Camry',2020),('ABC-200','Honda Civic',2019),('XYZ-300','Mazda',2021),('DEF-400','Ford Focus',2018);
INSERT INTO Accident VALUES('APR2197','2026-04-15','Motijheel, Dhaka'),('MAY3001','2026-05-20','Gulshan, Dhaka'),('JAN1001','2026-01-10','Mirpur, Dhaka');
INSERT INTO Owner VALUES('D001','YJK-100'),('D001','ABC-200'),('D002','XYZ-300'),('D003','DEF-400');
INSERT INTO Participated VALUES('D001','APR2197','YJK-100',2000),('D002','MAY3001','XYZ-300',5000),('D003','JAN1001','DEF-400',1500);
`;

/* ════════════════════════════════════════════════════════════
   SCHEMA DEFINITIONS (For HUD schema display card)
════════════════════════════════════════════════════════════ */
const SC_ECOM = [
  {n:'Customers',c:[['CustomerID','PK'],['Customer_Name',''],['PhoneNo',''],['Email',''],['CustomerAddress','']]},
  {n:'Products',c:[['ProductID','PK'],['Product_Name',''],['Category',''],['Product_Price',''],['StockQuantity','']]},
  {n:'Orders',c:[['OrderID','PK'],['CustomerID','FK'],['OrderDate','']]},
  {n:'OrderDetails',c:[['OrderID','FK'],['ProductID','FK'],['Quantity','']]},
  {n:'Payments',c:[['PaymentID','PK'],['OrderID','FK'],['Amount',''],['Payment_Method','']]}
];

const SC_UNI = [
  {n:'instructor',c:[['ID','PK'],['name',''],['dept_name','FK'],['salary','']]},
  {n:'student',c:[['ID','PK'],['name',''],['dept_name','FK'],['tot_cred','']]},
  {n:'department',c:[['dept_name','PK'],['building',''],['budget','']]},
  {n:'course',c:[['course_id','PK'],['title',''],['dept_name','FK'],['credits','']]},
  {n:'takes',c:[['ID','FK'],['course_id','FK'],['semester',''],['grade','']]},
  {n:'teaches',c:[['ID','FK'],['course_id','FK'],['semester',''],['year','']]}
];

const SC_EMP = [
  {n:'employee',c:[['person_name','PK'],['street',''],['city','']]},
  {n:'works',c:[['person_name','FK'],['company_name','FK'],['salary','']]},
  {n:'company',c:[['company_name','PK'],['city','']]},
  {n:'manages',c:[['person_name','FK'],['manager_name','']]}
];

const SC_INS = [
  {n:'Person',c:[['driver_id','PK'],['name',''],['address','']]},
  {n:'Car',c:[['license','PK'],['model',''],['year','']]},
  {n:'Accident',c:[['report_no','PK'],['date',''],['location','']]},
  {n:'Owner',c:[['driver_id','FK'],['license','FK']]},
  {n:'Participated',c:[['driver_id','FK'],['report_no','FK'],['car',''],['damage_amount','']]}
];

/* ════════════════════════════════════════════════════════════
   LEVEL & QUESTION DATA
════════════════════════════════════════════════════════════ */
const LEVELS = [
{id:1,title:'DDL Basics',sub:'Build Tables',icon:'🏗️',xp:100,setup:'',schema:[],qs:[
  {id:1,title:'Create Department Table',ctx:'📋 CT-1 (2024)',
   q:`Create a table called <code>Department</code> with two columns:<br>• <code>dept_id</code> — INTEGER, Primary Key<br>• <code>dept_name</code> — VARCHAR(100), NOT NULL`,
   type:'ddl_create',tbl:'Department',cols:['dept_id','dept_name'],
   ans:`CREATE TABLE Department (dept_id INTEGER PRIMARY KEY, dept_name VARCHAR(100) NOT NULL);`,
   start:`CREATE TABLE Department (\n  -- Write your columns here\n\n);`,
   hints:['CREATE TABLE syntax: <code>CREATE TABLE name (col1 TYPE constraint, ...);</code>','Primary key: <code>dept_id INTEGER PRIMARY KEY</code> — PK implies NOT NULL.','<code>CREATE TABLE Department (\n  dept_id INTEGER PRIMARY KEY,\n  dept_name VARCHAR(100) NOT NULL\n);</code>']},
  {id:2,title:'Create Students Table with FK',ctx:'📋 CT-1 (2024)',
   q:`Create a <code>Students</code> table with:<br>• <code>st_id</code> — INTEGER, Primary Key<br>• <code>st_name</code> — VARCHAR(40), NOT NULL<br>• <code>dept_id</code> — INTEGER, Foreign Key → Department(dept_id)<br>• <code>GPA</code> — NUMERIC(3,2)<br>• <code>address</code> — VARCHAR(200)`,
   type:'ddl_create',tbl:'Students',cols:['st_id','st_name','dept_id','gpa','address'],
   ans:`CREATE TABLE Students (st_id INTEGER PRIMARY KEY, st_name VARCHAR(40) NOT NULL, dept_id INTEGER, GPA NUMERIC(3,2), address VARCHAR(200), FOREIGN KEY (dept_id) REFERENCES Department(dept_id));`,
   start:`CREATE TABLE Students (\n  -- 5 columns + FOREIGN KEY constraint\n\n);`,
   hints:['FOREIGN KEY: <code>FOREIGN KEY (col) REFERENCES OtherTable(col)</code>','NUMERIC(3,2) means 3 total digits, 2 after decimal point.','<code>CREATE TABLE Students (\n  st_id INTEGER PRIMARY KEY,\n  st_name VARCHAR(40) NOT NULL,\n  dept_id INTEGER,\n  GPA NUMERIC(3,2),\n  address VARCHAR(200),\n  FOREIGN KEY (dept_id) REFERENCES Department(dept_id)\n);</code>']},
  {id:3,title:'ALTER TABLE — Add Column',ctx:'📋 CT-1 (2024)',
   q:`Add a new column <code>building_no</code> of type <code>INTEGER</code> to the existing <code>Department</code> table.`,
   type:'ddl_alter',tbl:'Department',col:'building_no',
   ans:`ALTER TABLE Department ADD building_no INTEGER;`,
   start:`-- Add a column to an existing table\nALTER TABLE Department\n  ADD -- your column definition;`,
   hints:['ALTER TABLE syntax: <code>ALTER TABLE name ADD col TYPE;</code>','You only need the ADD clause, not all original columns.','<code>ALTER TABLE Department ADD building_no INTEGER;</code>']},
  {id:4,title:'DROP TABLE',ctx:'📚 DDL Concepts',
   q:`The <code>Students</code> table needs to be removed. Write the SQL to <b>drop</b> the Students table.<br>Then re-create it with just two columns: <code>st_id INTEGER PRIMARY KEY</code> and <code>st_name VARCHAR(40)</code>.`,
   type:'ddl_drop_recreate',tbl:'Students',cols:['st_id','st_name'],
   ans:`DROP TABLE Students; CREATE TABLE Students (st_id INTEGER PRIMARY KEY, st_name VARCHAR(40));`,
   start:`-- Step 1: Remove the table\nDROP TABLE -- table name;\n\n-- Step 2: Recreate with only 2 columns\nCREATE TABLE Students (\n  \n);`,
   hints:['DROP TABLE: <code>DROP TABLE tablename;</code> — permanently removes the table & data.','After dropping, use CREATE TABLE again with the new structure.','<code>DROP TABLE Students;\nCREATE TABLE Students (\n  st_id INTEGER PRIMARY KEY,\n  st_name VARCHAR(40)\n);</code>']},
  {id:5,title:'DEFAULT Values & CHECK Constraint',ctx:'📚 DDL Constraints',
   q:`Create a table <code>Salary_Grade</code> with:<br>• <code>grade_id</code> — INTEGER, Primary Key<br>• <code>grade_name</code> — VARCHAR(50), NOT NULL<br>• <code>min_salary</code> — REAL, DEFAULT 0<br>• <code>max_salary</code> — REAL<br>• A CHECK constraint: <code>max_salary > min_salary</code>`,
   type:'ddl_create',tbl:'Salary_Grade',cols:['grade_id','grade_name','min_salary','max_salary'],
   ans:`CREATE TABLE Salary_Grade (grade_id INTEGER PRIMARY KEY, grade_name VARCHAR(50) NOT NULL, min_salary REAL DEFAULT 0, max_salary REAL, CHECK (max_salary > min_salary));`,
   start:`CREATE TABLE Salary_Grade (\n  grade_id INTEGER PRIMARY KEY,\n  grade_name VARCHAR(50) NOT NULL,\n  -- add min_salary with DEFAULT\n  -- add max_salary\n  -- add CHECK constraint\n);`,
   hints:['DEFAULT: <code>min_salary REAL DEFAULT 0</code>','CHECK constraint at the end: <code>CHECK (max_salary > min_salary)</code>','<code>CREATE TABLE Salary_Grade (\n  grade_id INTEGER PRIMARY KEY,\n  grade_name VARCHAR(50) NOT NULL,\n  min_salary REAL DEFAULT 0,\n  max_salary REAL,\n  CHECK (max_salary > min_salary)\n);</code>']},
  {id:6,title:'Composite Primary Key',ctx:'📚 DDL — Exam 2019',
   q:`Create an <code>Enrollment</code> table with:<br>• <code>student_id</code> — INTEGER<br>• <code>course_id</code> — VARCHAR(10)<br>• <code>enrolled_date</code> — TEXT<br>• <code>grade</code> — VARCHAR(2)<br>• <b>Composite Primary Key</b> on (student_id, course_id)`,
   type:'ddl_create',tbl:'Enrollment',cols:['student_id','course_id','enrolled_date','grade'],
   ans:`CREATE TABLE Enrollment (student_id INTEGER, course_id VARCHAR(10), enrolled_date TEXT, grade VARCHAR(2), PRIMARY KEY (student_id, course_id));`,
   start:`CREATE TABLE Enrollment (\n  student_id INTEGER,\n  course_id VARCHAR(10),\n  enrolled_date TEXT,\n  grade VARCHAR(2),\n  -- Composite PK here\n);`,
   hints:['Composite PK is declared at the end: <code>PRIMARY KEY (col1, col2)</code>','This allows the same student_id with different course_ids (but not duplicate pairs).','<code>CREATE TABLE Enrollment (\n  student_id INTEGER,\n  course_id VARCHAR(10),\n  enrolled_date TEXT,\n  grade VARCHAR(2),\n  PRIMARY KEY (student_id, course_id)\n);</code>']},
  {id:7,title:'Create Courses Table',ctx:'📋 Exam 2020',
   q:`Create a table called <code>Courses</code> with:<br>• <code>course_code</code> — VARCHAR(10), Primary Key<br>• <code>course_name</code> — VARCHAR(100), NOT NULL, UNIQUE<br>• <code>credits</code> — INTEGER, with CHECK constraint: <code>credits > 0</code>`,
   type:'ddl_create',tbl:'Courses',cols:['course_code','course_name','credits'],
   ans:`CREATE TABLE Courses (course_code VARCHAR(10) PRIMARY KEY, course_name VARCHAR(100) NOT NULL UNIQUE, credits INTEGER CHECK(credits > 0));`,
   start:`CREATE TABLE Courses (\n  course_code VARCHAR(10) PRIMARY KEY,\n  course_name VARCHAR(100) NOT NULL UNIQUE,\n  credits INTEGER\n  -- add CHECK constraint\n);`,
   hints:['CHECK syntax: <code>CHECK(credits > 0)</code> inline or at the end.','UNIQUE constraint ensures course name is not duplicated: <code>course_name VARCHAR(100) NOT NULL UNIQUE</code>','<code>CREATE TABLE Courses (\n  course_code VARCHAR(10) PRIMARY KEY,\n  course_name VARCHAR(100) NOT NULL UNIQUE,\n  credits INTEGER CHECK(credits > 0)\n);</code>']},
  {id:8,title:'ALTER TABLE — Rename Column',ctx:'📚 DDL Advanced',
   q:`Rename the column <code>building_no</code> to <code>dept_building</code> in the existing <code>Department</code> table.`,
   type:'ddl_alter',tbl:'Department',col:'dept_building',
   ans:`ALTER TABLE Department RENAME COLUMN building_no TO dept_building;`,
   start:`-- Rename building_no column to dept_building\nALTER TABLE Department\n  RENAME COLUMN -- your code;`,
   hints:['RENAME COLUMN syntax: <code>ALTER TABLE tablename RENAME COLUMN old_col TO new_col;</code>','Ensure table is Department and old column is building_no.','<code>ALTER TABLE Department RENAME COLUMN building_no TO dept_building;</code>']}
]},

{id:2,title:'Basic SELECT',sub:'Query the Data',icon:'🔍',xp:120,setup:DB_ECOM,schema:SC_ECOM,qs:[
  {id:1,title:'WHERE Clause Filter',ctx:'📋 CT-2 & Exam 2024',
   q:`Find the <b>names and phone numbers</b> of all customers who live in <b>Rajshahi</b>.`,
   type:'select',exp:`SELECT Customer_Name,PhoneNo FROM Customers WHERE CustomerAddress='Rajshahi'`,
   start:`SELECT -- which columns?\nFROM Customers\nWHERE -- condition?;`,
   hints:['WHERE filters rows. String values need single quotes: <code>WHERE col = \'value\'</code>','You need Customer_Name and PhoneNo. Filter where CustomerAddress equals Rajshahi.','<code>SELECT Customer_Name, PhoneNo\nFROM Customers\nWHERE CustomerAddress = \'Rajshahi\';</code>']},
  {id:2,title:'ORDER BY — Sort Results',ctx:'📋 Exam 2024',
   q:`List all <b>Electronics</b> products showing <code>Product_Name</code> and <code>Product_Price</code>, ordered by price from <b>highest to lowest</b>.`,
   type:'select',exp:`SELECT Product_Name,Product_Price FROM Products WHERE Category='Electronics' ORDER BY Product_Price DESC`,
   start:`SELECT Product_Name, Product_Price\nFROM Products\nWHERE -- filter by category\nORDER BY -- sort by price, direction?;`,
   hints:['ORDER BY sorts output. Default is ASC (low→high). Use DESC for high→low.','Filter: <code>WHERE Category = \'Electronics\'</code>','<code>SELECT Product_Name, Product_Price\nFROM Products\nWHERE Category = \'Electronics\'\nORDER BY Product_Price DESC;</code>']},
  {id:3,title:'LIKE Pattern Matching',ctx:'📚 Chapter 3',
   q:`Find <code>Product_Name</code> of all products whose name <b>contains the word "Phone"</b> anywhere in it.`,
   type:'select',exp:`SELECT Product_Name FROM Products WHERE Product_Name LIKE '%Phone%'`,
   start:`SELECT Product_Name\nFROM Products\nWHERE Product_Name LIKE -- pattern?;`,
   hints:['LIKE uses wildcards. <b>%</b> matches anything (zero or more chars). <b>_</b> matches exactly one char.','Pattern to match anything containing "Phone": <code>\'%Phone%\'</code>','<code>SELECT Product_Name\nFROM Products\nWHERE Product_Name LIKE \'%Phone%\';</code>']},
  {id:4,title:'NULL & Out of Stock',ctx:'📋 CT-2 (E-commerce)',
   q:`Find <b>product names and categories</b> of all products that are currently <b>out of stock</b> (StockQuantity = 0). Order by category.`,
   type:'select',exp:`SELECT Product_Name,Category FROM Products WHERE StockQuantity=0 ORDER BY Category`,
   start:`SELECT Product_Name, Category\nFROM Products\nWHERE -- zero stock condition\nORDER BY Category;`,
   hints:['Out of stock means StockQuantity equals zero: <code>WHERE StockQuantity = 0</code>','Add ORDER BY Category at the end to sort alphabetically.','<code>SELECT Product_Name, Category\nFROM Products\nWHERE StockQuantity = 0\nORDER BY Category;</code>']},
  {id:5,title:'BETWEEN Operator',ctx:'📚 Chapter 3 Predicates',
   q:`Find <code>Product_Name</code> and <code>Product_Price</code> of all products priced <b>between 2000 and 10000</b> (inclusive). Order by price ascending.`,
   type:'select',exp:`SELECT Product_Name,Product_Price FROM Products WHERE Product_Price BETWEEN 2000 AND 10000 ORDER BY Product_Price`,
   start:`SELECT Product_Name, Product_Price\nFROM Products\nWHERE -- use BETWEEN\nORDER BY Product_Price;`,
   hints:['BETWEEN is inclusive: <code>WHERE col BETWEEN low AND high</code> includes both endpoints.','This is equivalent to: <code>WHERE Product_Price >= 2000 AND Product_Price <= 10000</code>','<code>SELECT Product_Name, Product_Price\nFROM Products\nWHERE Product_Price BETWEEN 2000 AND 10000\nORDER BY Product_Price;</code>']},
  {id:6,title:'AND/OR — Multi-City Filter',ctx:'📋 Exam 2024',
   q:`Find <code>Customer_Name</code> and <code>CustomerAddress</code> of all customers from <b>Dhaka OR Chittagong</b>. Order by city, then name.`,
   type:'select',exp:`SELECT Customer_Name,CustomerAddress FROM Customers WHERE CustomerAddress='Dhaka' OR CustomerAddress='Chittagong' ORDER BY CustomerAddress,Customer_Name`,
   start:`SELECT Customer_Name, CustomerAddress\nFROM Customers\nWHERE -- Dhaka or Chittagong?\nORDER BY CustomerAddress, Customer_Name;`,
   hints:['OR is used when either condition can be true. Both sides still need the column name.','Alternative: <code>WHERE CustomerAddress IN (\'Dhaka\', \'Chittagong\')</code>','<code>SELECT Customer_Name, CustomerAddress\nFROM Customers\nWHERE CustomerAddress = \'Dhaka\'\n   OR CustomerAddress = \'Chittagong\'\nORDER BY CustomerAddress, Customer_Name;</code>']},
  {id:7,title:'DISTINCT Categories',ctx:'📚 Chapter 3 Basics',
   q:`Find all unique (distinct) product categories from the <code>Products</code> table.`,
   type:'select',exp:`SELECT DISTINCT Category FROM Products`,
   start:`SELECT DISTINCT -- columns?\nFROM Products;`,
   hints:['Use the DISTINCT keyword before the column name to eliminate duplicate values.','Syntax: <code>SELECT DISTINCT Category FROM Products;</code>','<code>SELECT DISTINCT Category\nFROM Products;</code>']},
  {id:8,title:'IN Operator — Specific Customers',ctx:'📋 Exam 2024',
   q:`Find the <code>Customer_Name</code> and <code>Email</code> of all customers whose <code>CustomerID</code> is 1, 3, or 5.`,
   type:'select',exp:`SELECT Customer_Name,Email FROM Customers WHERE CustomerID IN(1,3,5)`,
   start:`SELECT Customer_Name, Email\nFROM Customers\nWHERE CustomerID IN (-- specific IDs here);`,
   hints:['The IN operator matches any value in a list: <code>WHERE col IN (v1, v2, ...)</code>','You want IDs 1, 3, and 5.','<code>SELECT Customer_Name, Email\nFROM Customers\nWHERE CustomerID IN (1, 3, 5);</code>']}
]},

{id:3,title:'JOINs & Aliases',sub:'Connect Tables',icon:'🔗',xp:150,setup:DB_ECOM,schema:SC_ECOM,qs:[
  {id:1,title:'INNER JOIN Two Tables',ctx:'📋 Exam 2024',
   q:`Find <b>customer names</b> and their <b>order dates</b>. Only show customers who have placed at least one order. Use table aliases <code>c</code> and <code>o</code>.`,
   type:'select',exp:`SELECT c.Customer_Name,o.OrderDate FROM Customers c INNER JOIN Orders o ON c.CustomerID=o.CustomerID`,
   start:`SELECT c.Customer_Name, o.OrderDate\nFROM Customers c\n  -- JOIN Orders here\n  -- ON matching column;`,
   hints:['INNER JOIN returns rows matching in BOTH tables. Syntax: <code>t1 INNER JOIN t2 ON t1.col = t2.col</code>','Use aliases: <code>FROM Customers c INNER JOIN Orders o ON c.CustomerID = o.CustomerID</code>','<code>SELECT c.Customer_Name, o.OrderDate\nFROM Customers c\n  INNER JOIN Orders o ON c.CustomerID = o.CustomerID;</code>']},
  {id:2,title:'Three-Table JOIN Chain',ctx:'📋 Exam 2024',
   q:`Find the <b>customer name</b>, <b>product name</b>, and <b>quantity ordered</b> for every order item.<br><small style="color:var(--t2)">Chain: Customers → Orders → OrderDetails → Products</small>`,
   type:'select',exp:`SELECT c.Customer_Name,p.Product_Name,od.Quantity FROM Customers c JOIN Orders o ON c.CustomerID=o.CustomerID JOIN OrderDetails od ON o.OrderID=od.OrderID JOIN Products p ON od.ProductID=p.ProductID`,
   start:`SELECT c.Customer_Name, p.Product_Name, od.Quantity\nFROM Customers c\n  JOIN Orders o ON c.CustomerID = o.CustomerID\n  -- continue chain: JOIN OrderDetails, then Products`,
   hints:['Chain JOINs one after another. Each JOIN links the previous table to the next.','Path: Customers→Orders (CustomerID) → OrderDetails (OrderID) → Products (ProductID)','<code>SELECT c.Customer_Name, p.Product_Name, od.Quantity\nFROM Customers c\n  JOIN Orders o ON c.CustomerID = o.CustomerID\n  JOIN OrderDetails od ON o.OrderID = od.OrderID\n  JOIN Products p ON od.ProductID = p.ProductID;</code>']},
  {id:3,title:'LEFT JOIN — Include All',ctx:'📚 Chapter 3 Joins',
   q:`Find <b>ALL customers</b> and their order dates. Include customers who have <b>never ordered</b> — show NULL for their order date.<br><small style="color:var(--t2)">Customers 6,7,8 (Sadia, Tariq, Umme) have no orders.</small>`,
   type:'select',exp:`SELECT c.Customer_Name,o.OrderDate FROM Customers c LEFT JOIN Orders o ON c.CustomerID=o.CustomerID`,
   start:`SELECT c.Customer_Name, o.OrderDate\nFROM Customers c\n  -- Which JOIN includes all customers?`,
   hints:['LEFT JOIN includes ALL rows from the LEFT table. Unmatched right rows become NULL.','Change INNER JOIN to LEFT JOIN — same syntax, different keyword.','<code>SELECT c.Customer_Name, o.OrderDate\nFROM Customers c\n  LEFT JOIN Orders o ON c.CustomerID = o.CustomerID;</code>']},
  {id:4,title:'Self-JOIN — Employees & Managers',ctx:'📋 Exam 2023',
   q:`Using the <b>employee</b> schema below, find the <b>employee name</b> and <b>manager name</b> of pairs who work at the <b>same company</b>.<br>
    <small style="color:var(--t2)">Tables: employee(person_name,street,city) | works(person_name,company_name,salary) | manages(person_name,manager_name)</small>`,
   type:'select',extra:DB_EMP,exp:`SELECT m.person_name,m.manager_name FROM manages m JOIN works w1 ON m.person_name=w1.person_name JOIN works w2 ON m.manager_name=w2.person_name WHERE w1.company_name=w2.company_name`,
   start:`SELECT m.person_name, m.manager_name\nFROM manages m\n  JOIN works w1 ON m.person_name = w1.person_name\n  -- Join works AGAIN for the manager (alias w2)\nWHERE -- same company condition;`,
   hints:['Join "works" TWICE with different aliases: w1 for employee, w2 for manager.','Condition: <code>WHERE w1.company_name = w2.company_name</code>','<code>SELECT m.person_name, m.manager_name\nFROM manages m\n  JOIN works w1 ON m.person_name = w1.person_name\n  JOIN works w2 ON m.manager_name = w2.person_name\nWHERE w1.company_name = w2.company_name;</code>']},
  {id:5,title:'JOIN + Aggregate — Orders per Customer',ctx:'📋 Exam 2024',
   q:`Show every customer's <b>name</b> and <b>how many orders</b> they've placed (include <b>0</b> for those with no orders). Order by order count DESC.`,
   type:'select',exp:`SELECT c.Customer_Name,COUNT(o.OrderID) AS order_count FROM Customers c LEFT JOIN Orders o ON c.CustomerID=o.CustomerID GROUP BY c.CustomerID,c.Customer_Name ORDER BY order_count DESC`,
   start:`SELECT c.Customer_Name, COUNT(o.OrderID) AS order_count\nFROM Customers c\n  -- Which JOIN to include customers with 0 orders?\nGROUP BY c.CustomerID, c.Customer_Name\nORDER BY order_count DESC;`,
   hints:['Use LEFT JOIN so customers with no orders appear with NULL, then COUNT(o.OrderID) counts only real orders (NULLs = 0).','Alias: <code>LEFT JOIN Orders o ON c.CustomerID = o.CustomerID</code>','<code>SELECT c.Customer_Name, COUNT(o.OrderID) AS order_count\nFROM Customers c\n  LEFT JOIN Orders o ON c.CustomerID = o.CustomerID\nGROUP BY c.CustomerID, c.Customer_Name\nORDER BY order_count DESC;</code>']},
  {id:6,title:'Visa Customers — Multi-Table JOIN',ctx:'📋 Exam 2023',
   q:`Find <b>distinct customer names</b> who have paid by <b>Visa card</b>.<br><small style="color:var(--t2)">Chain: Customers → Orders → Payments</small>`,
   type:'select',exp:`SELECT DISTINCT c.Customer_Name FROM Customers c JOIN Orders o ON c.CustomerID=o.CustomerID JOIN Payments p ON o.OrderID=p.OrderID WHERE p.Payment_Method='Visa'`,
   start:`SELECT DISTINCT c.Customer_Name\nFROM Customers c\n  JOIN Orders o ON c.CustomerID = o.CustomerID\n  JOIN Payments p ON o.OrderID = p.OrderID\nWHERE -- filter payment method;`,
   hints:['Join Customers → Orders → Payments. The Payments table has Payment_Method column.','DISTINCT removes duplicate names if a customer paid Visa multiple times.','<code>SELECT DISTINCT c.Customer_Name\nFROM Customers c\n  JOIN Orders o ON c.CustomerID = o.CustomerID\n  JOIN Payments p ON o.OrderID = p.OrderID\nWHERE p.Payment_Method = \'Visa\';</code>']},
  {id:7,title:'NATURAL JOIN Orders & Payments',ctx:'📚 Chapter 3 Joins',
   q:`Find <code>OrderID</code>, <code>Amount</code>, and <code>Payment_Method</code> using a <code>NATURAL JOIN</code> between <code>Orders</code> and <code>Payments</code>.`,
   type:'select',exp:`SELECT OrderID,Amount,Payment_Method FROM Orders NATURAL JOIN Payments`,
   start:`SELECT OrderID, Amount, Payment_Method\nFROM Orders NATURAL JOIN Payments;`,
   hints:['NATURAL JOIN automatically matches columns with the same name (OrderID in this case) across both tables.','Syntax is simply: <code>FROM table1 NATURAL JOIN table2</code>','<code>SELECT OrderID, Amount, Payment_Method\nFROM Orders NATURAL JOIN Payments;</code>']},
  {id:8,title:'Furniture Orders with Quantities',ctx:'📋 Exam 2024',
   q:`Find <code>Customer_Name</code>, <code>Product_Name</code>, and <code>Quantity</code> for all ordered items in the 'Furniture' category.`,
   type:'select',exp:`SELECT c.Customer_Name,p.Product_Name,od.Quantity FROM Customers c JOIN Orders o ON c.CustomerID=o.CustomerID JOIN OrderDetails od ON o.OrderID=od.OrderID JOIN Products p ON od.ProductID=p.ProductID WHERE p.Category='Furniture'`,
   start:`SELECT c.Customer_Name, p.Product_Name, od.Quantity\nFROM Customers c\n  JOIN Orders o ON c.CustomerID = o.CustomerID\n  JOIN OrderDetails od ON o.OrderID = od.OrderID\n  JOIN Products p ON od.ProductID = p.ProductID\nWHERE -- filter for Furniture category;`,
   hints:['Join Customers → Orders → OrderDetails → Products.','Add filter condition: <code>WHERE p.Category = \'Furniture\'</code>','<code>SELECT c.Customer_Name, p.Product_Name, od.Quantity\nFROM Customers c\n  JOIN Orders o ON c.CustomerID = o.CustomerID\n  JOIN OrderDetails od ON o.OrderID = od.OrderID\n  JOIN Products p ON od.ProductID = p.ProductID\nWHERE p.Category = \'Furniture\';</code>']}
]},

{id:4,title:'Aggregate Functions',sub:'Count & Analyze',icon:'📊',xp:150,setup:DB_UNI,schema:SC_UNI,qs:[
  {id:1,title:'COUNT with GROUP BY & HAVING',ctx:'📋 CT-3 & Exam 2018',
   q:`Display the <b>department name</b> and <b>number of instructors</b> in each department. Only show departments with <b>more than 2 instructors</b>.`,
   type:'select',exp:`SELECT dept_name,COUNT(*) AS num_instructors FROM instructor GROUP BY dept_name HAVING COUNT(*)>2`,
   start:`SELECT dept_name, COUNT(*) AS num_instructors\nFROM instructor\nGROUP BY dept_name\n-- Filter GROUPS (not rows!) here;`,
   hints:['GROUP BY creates groups. COUNT(*) counts rows per group. HAVING filters groups AFTER grouping.','HAVING is like WHERE but for groups: <code>HAVING COUNT(*) > 2</code>','<code>SELECT dept_name, COUNT(*) AS num_instructors\nFROM instructor\nGROUP BY dept_name\nHAVING COUNT(*) > 2;</code>']},
  {id:2,title:'AVG Salary per Department',ctx:'📋 CT-3 (2024)',
   q:`Find the <b>department name</b> and <b>average salary</b> for each department. Show only departments where average salary is <b>over 70,000</b>.`,
   type:'select',exp:`SELECT dept_name,AVG(salary) AS avg_salary FROM instructor GROUP BY dept_name HAVING AVG(salary)>70000`,
   start:`SELECT dept_name, AVG(salary) AS avg_salary\nFROM instructor\nGROUP BY dept_name\nHAVING -- average salary condition;`,
   hints:['AVG(column) computes average. Use it in both SELECT and HAVING.','WHERE filters rows; HAVING filters groups. Average > 70000 is a group-level filter.','<code>SELECT dept_name, AVG(salary) AS avg_salary\nFROM instructor\nGROUP BY dept_name\nHAVING AVG(salary) > 70000;</code>']},
  {id:3,title:'Monthly Salary (Arithmetic)',ctx:'📋 CT-3 (2024)',
   q:`Find the <b>names and monthly salary</b> (annual ÷ 12, rounded to 2 decimal places) of instructors earning more than <b>90,000</b> annually.`,
   type:'select',exp:`SELECT name,ROUND(salary/12.0,2) AS monthly_salary FROM instructor WHERE salary>90000`,
   start:`SELECT name, ROUND(salary/12.0, 2) AS monthly_salary\nFROM instructor\nWHERE -- annual salary condition;`,
   hints:['Arithmetic in SELECT: salary/12.0 (use 12.0 not 12 for decimal result). ROUND(val, digits).','Use WHERE for row-level filter (before grouping). This has no GROUP BY.','<code>SELECT name, ROUND(salary/12.0, 2) AS monthly_salary\nFROM instructor\nWHERE salary > 90000;</code>']},
  {id:4,title:'Highest Salary per Department',ctx:'📋 Exam 2018',
   q:`Find the <b>name, department, and salary</b> of the instructor(s) earning the <b>highest salary within their department</b>.`,
   type:'select',exp:`SELECT dept_name,name,salary FROM instructor i WHERE salary=(SELECT MAX(salary) FROM instructor WHERE dept_name=i.dept_name) ORDER BY dept_name`,
   start:`SELECT dept_name, name, salary\nFROM instructor i\nWHERE salary = (\n  -- correlated subquery: max salary in same dept\n)\nORDER BY dept_name;`,
   hints:['Use a correlated subquery: for each row i, find MAX salary where dept_name matches i.dept_name.','Inner query: <code>SELECT MAX(salary) FROM instructor WHERE dept_name = i.dept_name</code>','<code>SELECT dept_name, name, salary\nFROM instructor i\nWHERE salary = (\n  SELECT MAX(salary) FROM instructor\n  WHERE dept_name = i.dept_name\n)\nORDER BY dept_name;</code>']},
  {id:5,title:'MIN, MAX & Salary Range',ctx:'📋 CT-3 (2024)',
   q:`For each department, show <code>dept_name</code>, <code>min_salary</code>, <code>max_salary</code>, and <code>salary_range</code> (max−min). Order by range descending.`,
   type:'select',exp:`SELECT dept_name,MIN(salary) AS min_salary,MAX(salary) AS max_salary,MAX(salary)-MIN(salary) AS salary_range FROM instructor GROUP BY dept_name ORDER BY salary_range DESC`,
   start:`SELECT dept_name,\n  MIN(salary) AS min_salary,\n  MAX(salary) AS max_salary,\n  -- salary_range = max minus min\nFROM instructor\nGROUP BY dept_name\nORDER BY salary_range DESC;`,
   hints:['MIN() and MAX() work like AVG() — they go in SELECT and work per GROUP.','Arithmetic in SELECT: <code>MAX(salary) - MIN(salary) AS salary_range</code>','<code>SELECT dept_name,\n  MIN(salary) AS min_salary,\n  MAX(salary) AS max_salary,\n  MAX(salary) - MIN(salary) AS salary_range\nFROM instructor\nGROUP BY dept_name\nORDER BY salary_range DESC;</code>']},
  {id:6,title:'Students with Most Courses (JOIN + GROUP)',ctx:'📋 CT-3 & Exam 2019',
   q:`Find <b>student names</b> and <b>total credits</b> of courses taken. Only include students who took <b>at least 2 courses</b>. Order by total credits DESC.`,
   type:'select',exp:`SELECT s.name,COUNT(t.course_id) AS courses_taken,SUM(c.credits) AS total_credits FROM student s JOIN takes t ON s.ID=t.ID JOIN course c ON t.course_id=c.course_id GROUP BY s.ID,s.name HAVING COUNT(t.course_id)>=2 ORDER BY total_credits DESC`,
   start:`SELECT s.name, COUNT(t.course_id) AS courses_taken, SUM(c.credits) AS total_credits\nFROM student s\n  JOIN takes t ON s.ID = t.ID\n  JOIN course c ON t.course_id = c.course_id\nGROUP BY s.ID, s.name\nHAVING -- at least 2 courses\nORDER BY total_credits DESC;`,
   hints:['Join student → takes → course to access credits. Group by student.','HAVING COUNT(t.course_id) >= 2 keeps only students with 2+ courses.','<code>SELECT s.name, COUNT(t.course_id) AS courses_taken, SUM(c.credits) AS total_credits\nFROM student s\n  JOIN takes t ON s.ID = t.ID\n  JOIN course c ON t.course_id = c.course_id\nGROUP BY s.ID, s.name\nHAVING COUNT(t.course_id) >= 2\nORDER BY total_credits DESC;</code>']},
  {id:7,title:'Total Budget per Building',ctx:'📋 Exam 2023',
   q:`Find the <code>building</code> name and the sum of budgets (<code>total_budget</code>) of all departments in each building, ordered by <code>total_budget</code> DESC.`,
   type:'select',exp:`SELECT building,SUM(budget) AS total_budget FROM department GROUP BY building ORDER BY total_budget DESC`,
   start:`SELECT building, SUM(budget) AS total_budget\nFROM department\nGROUP BY building\nORDER BY total_budget DESC;`,
   hints:['Group by building column. Sum up department budgets.','Syntax: <code>SUM(budget)</code> and <code>GROUP BY building</code>','<code>SELECT building, SUM(budget) AS total_budget\nFROM department\nGROUP BY building\nORDER BY total_budget DESC;</code>']},
  {id:8,title:'High Budget Departments (HAVING)',ctx:'📋 Exam 2024',
   q:`Find the <code>dept_name</code> and the number of instructors (<code>num_instructors</code>) in departments where the average instructor salary is greater than 70,000.`,
   type:'select',exp:`SELECT dept_name,COUNT(ID) AS num_instructors FROM instructor GROUP BY dept_name HAVING AVG(salary)>70000`,
   start:`SELECT dept_name, COUNT(ID) AS num_instructors\nFROM instructor\nGROUP BY dept_name\nHAVING -- average salary condition;`,
   hints:['Group by dept_name. Count instructors using COUNT(ID).','Filter with HAVING: <code>HAVING AVG(salary) > 70000</code>','<code>SELECT dept_name, COUNT(ID) AS num_instructors\nFROM instructor\nGROUP BY dept_name\nHAVING AVG(salary) > 70000;</code>']}
]},

{id:5,title:'Subqueries',sub:'Queries within Queries',icon:'🪆',xp:200,setup:DB_ECOM,schema:SC_ECOM,qs:[
  {id:1,title:'NOT IN — Inactive Customers',ctx:'📋 Exam 2024',
   q:`Find <b>names and phone numbers</b> of customers who have <b>not placed any orders</b> in the past 3 months.<br><small style="color:var(--t2)">Consider "recent" = OrderDate >= '2026-04-01'</small>`,
   type:'select',exp:`SELECT Customer_Name,PhoneNo FROM Customers WHERE CustomerID NOT IN(SELECT CustomerID FROM Orders WHERE OrderDate>='2026-04-01')`,
   start:`SELECT Customer_Name, PhoneNo\nFROM Customers\nWHERE CustomerID NOT IN (\n  -- subquery: who placed orders recently?\n);`,
   hints:['NOT IN excludes any CustomerID found in the subquery result.','Inner query: <code>SELECT CustomerID FROM Orders WHERE OrderDate >= \'2026-04-01\'</code>','<code>SELECT Customer_Name, PhoneNo\nFROM Customers\nWHERE CustomerID NOT IN (\n  SELECT CustomerID FROM Orders\n  WHERE OrderDate >= \'2026-04-01\'\n);</code>']},
  {id:2,title:'EXISTS — Correlated Subquery',ctx:'📚 Chapter 3',
   q:`Find <b>product names</b> that have been ordered <b>at least once</b>. Use <code>EXISTS</code>.`,
   type:'select',exp:`SELECT Product_Name FROM Products p WHERE EXISTS(SELECT 1 FROM OrderDetails od WHERE od.ProductID=p.ProductID)`,
   start:`SELECT Product_Name\nFROM Products p\nWHERE EXISTS (\n  -- inner query checks if this product was ordered\n);`,
   hints:['EXISTS returns TRUE if subquery returns ANY rows. Reference outer table\'s column inside.','Inner query: check OrderDetails for a row matching the outer Products row\'s ProductID.','<code>SELECT Product_Name\nFROM Products p\nWHERE EXISTS (\n  SELECT 1 FROM OrderDetails od\n  WHERE od.ProductID = p.ProductID\n);</code>']},
  {id:3,title:'Correlated — Above-Average Earners',ctx:'📋 Exam 2023',
   q:`Using the <b>works</b> table, find employees who earn <b>more than the average salary at their own company</b>.<br><small style="color:var(--t2)">Tables: works(person_name, company_name, salary)</small>`,
   type:'select',extra:DB_EMP,exp:`SELECT person_name,company_name,salary FROM works w1 WHERE salary>(SELECT AVG(salary) FROM works w2 WHERE w2.company_name=w1.company_name)`,
   start:`SELECT person_name, company_name, salary\nFROM works w1\nWHERE salary > (\n  -- find average salary at THIS employee's company\n  -- use w1.company_name to correlate!\n);`,
   hints:['Correlated subquery: the inner query references w1.company_name from the OUTER query — recalculates per row.','Inner query: <code>SELECT AVG(salary) FROM works w2 WHERE w2.company_name = w1.company_name</code>','<code>SELECT person_name, company_name, salary\nFROM works w1\nWHERE salary > (\n  SELECT AVG(salary) FROM works w2\n  WHERE w2.company_name = w1.company_name\n);</code>']},
  {id:4,title:'ALL — Beat Everyone in Music',ctx:'📋 CT-3 (2024)',
   q:`Using the university DB, find <b>names of instructors</b> who earn <b>more than ALL instructors</b> in the <b>Music</b> department.`,
   type:'select',extra:DB_UNI,exp:`SELECT name FROM instructor WHERE salary>ALL(SELECT salary FROM instructor WHERE dept_name='Music')`,
   start:`SELECT name\nFROM instructor\nWHERE salary > ALL (\n  -- subquery: all Music dept salaries\n);`,
   hints:['> ALL means greater than the MAXIMUM value returned by the subquery.','Inner query gets all Music salaries: <code>SELECT salary FROM instructor WHERE dept_name = \'Music\'</code>','<code>SELECT name\nFROM instructor\nWHERE salary > ALL (\n  SELECT salary FROM instructor\n  WHERE dept_name = \'Music\'\n);</code>']},
  {id:5,title:'Derived Table (Subquery in FROM)',ctx:'📚 Chapter 3 Advanced',
   q:`Find departments whose <b>average instructor salary</b> is <b>above the overall average</b>. Show dept name and their average salary.<br><small style="color:var(--t2)">Use a subquery in the FROM clause as a derived table.</small>`,
   type:'select',extra:DB_UNI,exp:`SELECT dept_name,avg_sal FROM(SELECT dept_name,AVG(salary) AS avg_sal FROM instructor GROUP BY dept_name) WHERE avg_sal>(SELECT AVG(salary) FROM instructor)`,
   start:`SELECT dept_name, avg_sal\nFROM (\n  -- derived table: avg salary per dept\n  SELECT dept_name, AVG(salary) AS avg_sal\n  FROM instructor\n  GROUP BY dept_name\n)\nWHERE avg_sal > (\n  -- overall average\n  SELECT AVG(salary) FROM instructor\n);`,
   hints:['A subquery in FROM creates a temporary derived table. You query it like a real table.','The outer WHERE compares each dept\'s avg_sal against the overall average.','<code>SELECT dept_name, avg_sal\nFROM (\n  SELECT dept_name, AVG(salary) AS avg_sal\n  FROM instructor GROUP BY dept_name\n)\nWHERE avg_sal > (SELECT AVG(salary) FROM instructor);</code>']},
  {id:6,title:'Physics Course Students',ctx:'📋 CT-3 (2024)',
   q:`Find names of all students who have taken <b>at least one course offered by the Physics department</b>.`,
   type:'select',extra:DB_UNI,exp:`SELECT DISTINCT s.name FROM student s WHERE s.ID IN(SELECT t.ID FROM takes t JOIN course c ON t.course_id=c.course_id WHERE c.dept_name='Physics')`,
   start:`SELECT DISTINCT s.name\nFROM student s\nWHERE s.ID IN (\n  SELECT t.ID\n  FROM takes t\n    JOIN course c ON t.course_id = c.course_id\n  WHERE -- Physics department filter\n);`,
   hints:['Inner query: join takes and course, filter by Physics dept, return student IDs.','Then outer query: get student names where ID is in that list.','<code>SELECT DISTINCT s.name\nFROM student s\nWHERE s.ID IN (\n  SELECT t.ID FROM takes t\n    JOIN course c ON t.course_id = c.course_id\n  WHERE c.dept_name = \'Physics\'\n);</code>']},
  {id:7,title:'Subquery in WHERE — Laptop Buyers',ctx:'📋 Exam 2024',
   q:`Find the <code>Customer_Name</code> and <code>Email</code> of customers who have ordered <b>'Laptop Pro'</b> (ProductID = 1) using a subquery (nested query).`,
   type:'select',exp:`SELECT Customer_Name,Email FROM Customers WHERE CustomerID IN (SELECT CustomerID FROM Orders WHERE OrderID IN (SELECT OrderID FROM OrderDetails WHERE ProductID=1))`,
   start:`SELECT Customer_Name, Email\nFROM Customers\nWHERE CustomerID IN (\n  -- subquery: find CustomerID of people who ordered ProductID=1\n);`,
   hints:['You can nest IN subqueries: Customers IN Orders IN OrderDetails.','Product ID is 1.','<code>SELECT Customer_Name, Email\nFROM Customers\nWHERE CustomerID IN (\n  SELECT CustomerID FROM Orders\n  WHERE OrderID IN (\n    SELECT OrderID FROM OrderDetails\n    WHERE ProductID = 1\n  )\n);</code>']},
  {id:8,title:'NOT EXISTS — Untaken Courses',ctx:'📚 Chapter 3 Advanced',
   q:`Find the <code>course_id</code> and <code>title</code> of all courses that have <b>never been taken</b> by any student (using a correlated <code>NOT EXISTS</code> subquery).`,
   type:'select',extra:DB_UNI,exp:`SELECT course_id,title FROM course c WHERE NOT EXISTS (SELECT 1 FROM takes t WHERE t.course_id=c.course_id)`,
   start:`SELECT course_id, title\nFROM course c\nWHERE NOT EXISTS (\n  -- correlated: check takes table for this course_id\n);`,
   hints:['Correlated NOT EXISTS: the inner query checks takes and refers to c.course_id.','Inner query: <code>SELECT 1 FROM takes t WHERE t.course_id = c.course_id</code>','<code>SELECT course_id, title\nFROM course c\nWHERE NOT EXISTS (\n  SELECT 1 FROM takes t\n  WHERE t.course_id = c.course_id\n);</code>']}
]},

{id:6,title:'Set Ops & Views',sub:'Combine & Abstract',icon:'🌐',xp:200,setup:DB_UNI,schema:SC_UNI,qs:[
  {id:1,title:'UNION — Merge Two Results',ctx:'📚 Chapter 3 Set Ops',
   q:`Find all people who are <b>either instructors OR students</b> (or both). Return their names. Remove duplicates.<br><small style="color:var(--t2)">'Brandt' appears in both tables — UNION shows it once.</small>`,
   type:'select',exp:`SELECT name FROM instructor UNION SELECT name FROM student`,
   start:`-- Query 1: all instructor names\nSELECT name FROM instructor\n-- Set operation keyword here\n-- Query 2: all student names\nSELECT name FROM student;`,
   hints:['UNION combines two SELECT results and removes duplicates. UNION ALL keeps all duplicates.','Both SELECT statements must return same number of columns.','<code>SELECT name FROM instructor\nUNION\nSELECT name FROM student;</code>']},
  {id:2,title:'NOT IN — No Courses Taken',ctx:'📚 Chapter 3',
   q:`Find the <b>names of students</b> who have <b>never taken any course</b> (no entry in the takes table).`,
   type:'select',exp:`SELECT name FROM student WHERE ID NOT IN(SELECT DISTINCT ID FROM takes)`,
   start:`SELECT name\nFROM student\nWHERE ID NOT IN (\n  -- who HAS taken courses?\n);`,
   hints:['Find student IDs that DO appear in takes, then EXCLUDE those from students.','<code>SELECT DISTINCT ID FROM takes</code> gives all student IDs who took at least one course.','<code>SELECT name FROM student\nWHERE ID NOT IN (\n  SELECT DISTINCT ID FROM takes\n);</code>']},
  {id:3,title:'CREATE VIEW',ctx:'📋 Exam 2018 & Chapter 3',
   q:`Create a VIEW named <code>high_salary_instructors</code> that shows <code>name</code>, <code>dept_name</code>, and <code>salary</code> of all instructors earning <b>more than 80,000</b>.<br>Then write a SELECT to query this view.`,
   type:'view',vname:'high_salary_instructors',
   exp:`CREATE VIEW high_salary_instructors AS SELECT name,dept_name,salary FROM instructor WHERE salary>80000`,
   start:`-- Step 1: Create the view\nCREATE VIEW high_salary_instructors AS\n  -- SELECT statement here\n\n-- Step 2: Query the view\nSELECT * FROM high_salary_instructors;`,
   hints:['CREATE VIEW syntax: <code>CREATE VIEW name AS SELECT ...;</code>','The view stores your SELECT query. Query the view just like a table.','<code>CREATE VIEW high_salary_instructors AS\n  SELECT name, dept_name, salary\n  FROM instructor\n  WHERE salary > 80000;\n\nSELECT * FROM high_salary_instructors;</code>']},
  {id:4,title:'Dept with Highest Average Salary',ctx:'📋 CT-3 (2024)',
   q:`Find the <b>department name</b> whose instructors have the <b>highest average salary</b> among all departments.`,
   type:'select',exp:`SELECT dept_name FROM instructor GROUP BY dept_name HAVING AVG(salary)=(SELECT MAX(avg_s) FROM(SELECT AVG(salary) AS avg_s FROM instructor GROUP BY dept_name))`,
   start:`SELECT dept_name\nFROM instructor\nGROUP BY dept_name\nHAVING AVG(salary) = (\n  SELECT MAX(avg_s)\n  FROM (\n    SELECT AVG(salary) AS avg_s\n    FROM instructor\n    GROUP BY dept_name\n  )\n);`,
   hints:['Step 1: avg salary per dept. Step 2: max of those averages. Step 3: filter for the dept matching that max.','The nested subquery computes the maximum avg salary across all departments.','<code>SELECT dept_name FROM instructor GROUP BY dept_name\nHAVING AVG(salary) = (\n  SELECT MAX(avg_s) FROM (\n    SELECT AVG(salary) AS avg_s FROM instructor GROUP BY dept_name\n  )\n);</code>']},
  {id:5,title:'INTERSECT — Depts with Both Instructors & Courses',ctx:'📚 Chapter 3 Set Ops',
   q:`Find department names that <b>both</b> have instructors <b>AND</b> offer courses. Use <code>INTERSECT</code>.`,
   type:'select',exp:`SELECT dept_name FROM instructor INTERSECT SELECT dept_name FROM course`,
   start:`-- Departments that have instructors\nSELECT dept_name FROM instructor\n-- Set operation: only those in BOTH results\nINTERSECT\n-- Departments that offer courses\nSELECT dept_name FROM course;`,
   hints:['INTERSECT returns only rows that appear in BOTH SELECT results.','Unlike UNION (adds), INTERSECT filters to the common set.','<code>SELECT dept_name FROM instructor\nINTERSECT\nSELECT dept_name FROM course;</code>']},
  {id:6,title:'WITH Clause (CTE)',ctx:'📚 Advanced SQL',
   q:`Use a <code>WITH</code> clause to create a temporary named result set <code>dept_totals</code> that computes each department's <b>total salary</b>. Then show departments where total exceeds <b>200,000</b>.`,
   type:'select',exp:`WITH dept_totals AS(SELECT dept_name,SUM(salary) AS total_sal FROM instructor GROUP BY dept_name) SELECT dept_name,total_sal FROM dept_totals WHERE total_sal>200000 ORDER BY total_sal DESC`,
   start:`WITH dept_totals AS (\n  SELECT dept_name, SUM(salary) AS total_sal\n  FROM instructor\n  GROUP BY dept_name\n)\nSELECT dept_name, total_sal\nFROM dept_totals\nWHERE -- total > 200000\nORDER BY total_sal DESC;`,
   hints:['WITH clause syntax: <code>WITH name AS (SELECT ...) SELECT ... FROM name WHERE ...;</code>','Think of it as giving a name to a subquery so you can reference it cleanly.','<code>WITH dept_totals AS (\n  SELECT dept_name, SUM(salary) AS total_sal\n  FROM instructor GROUP BY dept_name\n)\nSELECT dept_name, total_sal FROM dept_totals\nWHERE total_sal > 200000\nORDER BY total_sal DESC;</code>']},
  {id:7,title:'EXCEPT — Courses Not Taught',ctx:'📚 Chapter 3 Set Ops',
   q:`Find all <code>course_id</code>s that are offered in the <code>course</code> table but are **not taught** by any instructor in the <code>teaches</code> table.`,
   type:'select',exp:`SELECT course_id FROM course EXCEPT SELECT course_id FROM teaches`,
   start:`-- Select course_ids from course\nSELECT course_id FROM course\n-- EXCEPT keyword\nEXCEPT\n-- Select course_ids from teaches\nSELECT course_id FROM teaches;`,
   hints:['EXCEPT returns rows from first query that are not in second query.','Syntax: <code>SELECT col FROM t1 EXCEPT SELECT col FROM t2;</code>','<code>SELECT course_id FROM course EXCEPT SELECT course_id FROM teaches;</code>']},
  {id:8,title:'CREATE VIEW — Course Enrollment',ctx:'📋 Exam 2022',
   q:`Create a view called <code>course_enrollment_summary</code> showing the <code>course_id</code>, course <code>title</code>, and the count of students enrolled in that course as <code>student_count</code>.<br>Include courses with <b>0</b> students enrolled.`,
   type:'view',vname:'course_enrollment_summary',
   exp:`CREATE VIEW course_enrollment_summary AS SELECT c.course_id,c.title,COUNT(t.ID) AS student_count FROM course c LEFT JOIN takes t ON c.course_id=t.course_id GROUP BY c.course_id,c.title`,
   start:`CREATE VIEW course_enrollment_summary AS\n  SELECT c.course_id, c.title, COUNT(t.ID) AS student_count\n  FROM course c\n    -- Join takes here to count students\n  GROUP BY c.course_id, c.title;\n\n-- View query:\nSELECT * FROM course_enrollment_summary;`,
   hints:['Use LEFT JOIN so courses with 0 students appear.','COUNT(t.ID) counts students in each group.','<code>CREATE VIEW course_enrollment_summary AS\n  SELECT c.course_id, c.title, COUNT(t.ID) AS student_count\n  FROM course c\n    LEFT JOIN takes t ON c.course_id = t.course_id\n  GROUP BY c.course_id, c.title;\n\nSELECT * FROM course_enrollment_summary;</code>']}
]},

{id:7,title:'DML — Modify Data',sub:'Insert, Update, Delete',icon:'✏️',xp:150,setup:DB_INS,schema:SC_INS,qs:[
  {id:1,title:'INSERT New Record',ctx:'📋 Exam 2017',
   q:`Add a new accident to the database:<br>• report_no: <code>'JUN5050'</code><br>• date: <code>'2026-06-15'</code><br>• location: <code>'Banani, Dhaka'</code><br><br>Then run <code>SELECT * FROM Accident;</code> to verify.`,
   type:'dml',vSQL:`SELECT COUNT(*) AS cnt FROM Accident WHERE report_no='JUN5050'`,expVal:1,
   ans:`INSERT INTO Accident (report_no, date, location) VALUES ('JUN5050', '2026-06-15', 'Banani, Dhaka');`,
   start:`INSERT INTO Accident\n  (report_no, date, location)\nVALUES\n  ('JUN5050', '2026-06-15', 'Banani, Dhaka');`,
   hints:['INSERT syntax: <code>INSERT INTO table (col1, col2) VALUES (val1, val2);</code>','You can also omit column names if values are in table order: <code>INSERT INTO Accident VALUES (...);</code>','<code>INSERT INTO Accident (report_no, date, location)\nVALUES (\'JUN5050\', \'2026-06-15\', \'Banani, Dhaka\');</code>']},
  {id:2,title:'UPDATE Specific Row',ctx:'📋 Exam 2017',
   q:`Update the <code>damage_amount</code> to <b>3000</b> for the car with license <code>'YJK-100'</code> in accident report <code>'APR2197'</code>.`,
   type:'dml',vSQL:`SELECT damage_amount FROM Participated WHERE car='YJK-100' AND report_no='APR2197'`,expVal:3000,
   ans:`UPDATE Participated SET damage_amount = 3000 WHERE car = 'YJK-100' AND report_no = 'APR2197';`,
   start:`UPDATE Participated\nSET damage_amount = -- new value\nWHERE -- identify the exact row;`,
   hints:['UPDATE syntax: <code>UPDATE table SET col = value WHERE condition;</code>','Filter by BOTH car license AND report_no to target the exact row.','<code>UPDATE Participated\nSET damage_amount = 3000\nWHERE car = \'YJK-100\'\n  AND report_no = \'APR2197\';</code>']},
  {id:3,title:'DELETE Record',ctx:'📋 Exam 2017',
   q:`Delete the car with model <code>'Mazda'</code> from the <code>Car</code> table.<br><small style="color:var(--t2)">In our data, the Mazda has license 'XYZ-300'</small>`,
   type:'dml',vSQL:`SELECT COUNT(*) AS cnt FROM Car WHERE model='Mazda'`,expVal:0,
   ans:`DELETE FROM Car WHERE model = 'Mazda';`,
   start:`DELETE FROM Car\nWHERE -- which car?;`,
   hints:['DELETE syntax: <code>DELETE FROM tablename WHERE condition;</code>','ALWAYS use WHERE! Without it, ALL rows are deleted.','<code>DELETE FROM Car\nWHERE model = \'Mazda\';</code>']},
  {id:4,title:'CASE in UPDATE',ctx:'📋 Exam 2023 & Chapter 3',
   q:`Update salaries in the <code>works</code> table (loaded below):<br>• If salary > <b>20,000</b>: increase by <b>6%</b><br>• Otherwise: increase by <b>5%</b><br>Use a single UPDATE with a CASE statement.`,
   type:'dml_case',extra:DB_EMP,
   vSQL:`SELECT SUM(salary) AS total FROM works`,
   ans:`UPDATE works SET salary = CASE WHEN salary > 20000 THEN salary * 1.06 ELSE salary * 1.05 END;`,
   start:`UPDATE works\nSET salary = CASE\n  WHEN salary > 20000 THEN salary * 1.06\n  ELSE -- 5% increase\nEND;`,
   hints:['CASE in UPDATE: <code>SET col = CASE WHEN cond THEN v1 ELSE v2 END</code>','×1.06 = original + 6%. ×1.05 = original + 5%.','<code>UPDATE works\nSET salary = CASE\n  WHEN salary > 20000 THEN salary * 1.06\n  ELSE salary * 1.05\nEND;</code>']},
  {id:5,title:'UPDATE with Subquery',ctx:'📋 Exam 2022',
   q:`In the <code>Participated</code> table, increase <code>damage_amount</code> by <b>20%</b> for all accidents that occurred in <b>Gulshan</b>.<br><small style="color:var(--t2)">Accident MAY3001 is in Gulshan. Its current damage is 5000 → should become 6000.</small>`,
   type:'dml',vSQL:`SELECT damage_amount FROM Participated WHERE report_no='MAY3001'`,expVal:6000,
   ans:`UPDATE Participated SET damage_amount = damage_amount * 1.20 WHERE report_no IN (SELECT report_no FROM Accident WHERE location LIKE '%Gulshan%');`,
   start:`UPDATE Participated\nSET damage_amount = damage_amount * 1.20\nWHERE report_no IN (\n  -- subquery: get report_nos from Accident where location is Gulshan\n);`,
   hints:['Use IN with a subquery to find the right report numbers.','Inner query: <code>SELECT report_no FROM Accident WHERE location LIKE \'%Gulshan%\'</code>','<code>UPDATE Participated\nSET damage_amount = damage_amount * 1.20\nWHERE report_no IN (\n  SELECT report_no FROM Accident\n  WHERE location LIKE \'%Gulshan%\'\n);</code>']},
  {id:6,title:'DELETE Uninvolved Cars',ctx:'📚 DML Advanced',
   q:`Delete all cars from the <code>Car</code> table that have <b>never been involved</b> in any accident (not in <code>Participated.car</code>).<br><small style="color:var(--t2)">Car 'ABC-200' (Honda Civic) never had an accident. Only it should be deleted.</small>`,
   type:'dml',vSQL:`SELECT COUNT(*) AS cnt FROM Car`,expVal:3,
   ans:`DELETE FROM Car WHERE license NOT IN (SELECT DISTINCT car FROM Participated);`,
   start:`DELETE FROM Car\nWHERE license NOT IN (\n  -- subquery: cars that appear in Participated\n);`,
   hints:['NOT IN with subquery: find licenses that DO appear in accidents, then delete everything else.','Inner query: <code>SELECT DISTINCT car FROM Participated</code>','<code>DELETE FROM Car\nWHERE license NOT IN (\n  SELECT DISTINCT car FROM Participated\n);</code>']},
  {id:7,title:'INSERT from SELECT',ctx:'📚 DML Concepts',
   q:`We have created a table <code>Premium_Customers(CustomerID, Customer_Name, Email)</code>.<br>Insert all customers from the <code>Customers</code> table who live in <b>Rajshahi</b> into <code>Premium_Customers</code>.`,
   type:'dml',extra:DB_ECOM + "\nCREATE TABLE Premium_Customers(CustomerID INTEGER PRIMARY KEY, Customer_Name TEXT, Email TEXT);",
   vSQL:`SELECT COUNT(*) FROM Premium_Customers`,expVal:4,
   ans:`INSERT INTO Premium_Customers SELECT CustomerID, Customer_Name, Email FROM Customers WHERE CustomerAddress='Rajshahi';`,
   start:`INSERT INTO Premium_Customers\n  SELECT CustomerID, Customer_Name, Email\n  FROM Customers\n  WHERE -- filter Rajshahi;`,
   hints:['INSERT from SELECT syntax: <code>INSERT INTO target SELECT cols FROM source WHERE cond;</code>','Note that VALUES is not used when inserting from a sub-SELECT.','<code>INSERT INTO Premium_Customers\nSELECT CustomerID, Customer_Name, Email\nFROM Customers\nWHERE CustomerAddress = \'Rajshahi\';</code>']},
  {id:8,title:'DELETE Unpaid Orders',ctx:'📋 Exam 2023',
   q:`Delete all orders from the <code>Orders</code> table that do not have any corresponding payment in the <code>Payments</code> table.`,
   type:'dml',extra:DB_ECOM,
   vSQL:`SELECT COUNT(*) FROM Orders`,expVal:6,
   ans:`DELETE FROM Orders WHERE OrderID NOT IN (SELECT OrderID FROM Payments);`,
   start:`DELETE FROM Orders\nWHERE OrderID NOT IN (\n  -- subquery: order IDs from Payments\n);`,
   hints:['Use NOT IN with a subquery selecting OrderID from Payments.','This removes the orders that have not been paid yet.','<code>DELETE FROM Orders\nWHERE OrderID NOT IN (\n  SELECT OrderID FROM Payments\n);</code>']}
]},

{id:8,title:'Boss Level 🔥',sub:'Past Exam Gauntlet',icon:'🔥',xp:300,setup:DB_EMP,schema:SC_EMP,qs:[
  {id:1,title:'VIEW — Salary After Raise',ctx:'📋 Exam 2022 & 2023',
   q:`Create a view <code>xyz_raised_salaries</code> showing the names and salaries of <b>"XYZ Co."</b> employees <em>after a 10% raise</em> — <b>without changing the actual data</b>.`,
   type:'view',vname:'xyz_raised_salaries',
   exp:`CREATE VIEW xyz_raised_salaries AS SELECT person_name,salary*1.10 AS raised_salary FROM works WHERE company_name='XYZ Co.'`,
   start:`CREATE VIEW xyz_raised_salaries AS\n  SELECT person_name, salary * 1.10 AS raised_salary\n  FROM works\n  WHERE -- filter for XYZ Co.;\n\n-- Then view it:\nSELECT * FROM xyz_raised_salaries;`,
   hints:['Views show computed results without changing data. salary * 1.10 = salary + 10%.','Filter: <code>WHERE company_name = \'XYZ Co.\'</code>','<code>CREATE VIEW xyz_raised_salaries AS\n  SELECT person_name, salary * 1.10 AS raised_salary\n  FROM works\n  WHERE company_name = \'XYZ Co.\';</code>']},
  {id:2,title:'Companies with High Average Salary',ctx:'📋 Exam 2022',
   q:`Find the <b>company name(s)</b> where the <b>average employee salary is higher than 15,000</b>.`,
   type:'select',exp:`SELECT company_name FROM works GROUP BY company_name HAVING AVG(salary)>15000`,
   start:`SELECT company_name\nFROM works\nGROUP BY company_name\nHAVING -- average salary condition;`,
   hints:['GROUP BY company_name groups employees. AVG(salary) computes per group.','HAVING AVG(salary) > 15000 filters groups where average exceeds 15000.','<code>SELECT company_name\nFROM works\nGROUP BY company_name\nHAVING AVG(salary) > 15000;</code>']},
  {id:3,title:'Most Expensive per Category',ctx:'📋 Exam 2024',
   q:`Using the <b>E-commerce Products</b> table, find the <b>category, product name, and price</b> of the <b>most expensive product in each category</b>.`,
   type:'select',extra:DB_ECOM,exp:`SELECT p.Category,p.Product_Name,p.Product_Price FROM Products p WHERE p.Product_Price=(SELECT MAX(Product_Price) FROM Products WHERE Category=p.Category) ORDER BY p.Category`,
   start:`SELECT p.Category, p.Product_Name, p.Product_Price\nFROM Products p\nWHERE p.Product_Price = (\n  -- correlated: MAX price in same category\n)\nORDER BY p.Category;`,
   hints:['Correlated subquery: for each row p, find MAX price where Category equals p.Category.','Inner query: <code>SELECT MAX(Product_Price) FROM Products WHERE Category = p.Category</code>','<code>SELECT p.Category, p.Product_Name, p.Product_Price\nFROM Products p\nWHERE p.Product_Price = (\n  SELECT MAX(Product_Price) FROM Products\n  WHERE Category = p.Category\n)\nORDER BY p.Category;</code>']},
  {id:4,title:'Employees at First Bank in Main City',ctx:'📋 Exam 2021',
   q:`Find <b>names of all employees</b> who work for <b>"First Bank Corporation"</b> AND live in <b>"Main City"</b>.`,
   type:'select',exp:`SELECT e.person_name FROM employee e JOIN works w ON e.person_name=w.person_name WHERE w.company_name='First Bank Corporation' AND e.city='Main City'`,
   start:`SELECT e.person_name\nFROM employee e\n  JOIN works w ON e.person_name = w.person_name\nWHERE -- company AND city conditions;`,
   hints:['Join employee (for city) with works (for company). Both conditions in WHERE with AND.','employee.city for location; works.company_name for employer.','<code>SELECT e.person_name\nFROM employee e\n  JOIN works w ON e.person_name = w.person_name\nWHERE w.company_name = \'First Bank Corporation\'\n  AND e.city = \'Main City\';</code>']},
  {id:5,title:'Employees in Same City as Manager',ctx:'📋 Exam 2021',
   q:`Find <b>employee names</b> who live in the <b>same city as their manager</b>.<br><small style="color:var(--t2)">Join employee twice: once for the employee, once for their manager.</small>`,
   type:'select',exp:`SELECT e1.person_name,e1.city FROM employee e1 JOIN manages m ON e1.person_name=m.person_name JOIN employee e2 ON m.manager_name=e2.person_name WHERE e1.city=e2.city`,
   start:`SELECT e1.person_name, e1.city\nFROM employee e1\n  JOIN manages m ON e1.person_name = m.person_name\n  -- Join employee again for the MANAGER (alias e2)\nWHERE -- same city condition;`,
   hints:['Join employee as e1 (employee), manages for the relationship, employee again as e2 (manager).','Same city: <code>WHERE e1.city = e2.city</code>','<code>SELECT e1.person_name, e1.city\nFROM employee e1\n  JOIN manages m ON e1.person_name = m.person_name\n  JOIN employee e2 ON m.manager_name = e2.person_name\nWHERE e1.city = e2.city;</code>']},
  {id:6,title:'Accident Analysis — Total Damage',ctx:'📋 Exam 2021 & 2023',
   q:`Using the insurance DB, find each <b>person\'s name</b>, <b>number of accidents</b> they participated in, and their <b>total damage amount</b>. Order by total damage DESC.`,
   type:'select',extra:DB_INS,exp:`SELECT p.name,COUNT(pa.report_no) AS num_accidents,SUM(pa.damage_amount) AS total_damage FROM Person p JOIN Participated pa ON p.driver_id=pa.driver_id GROUP BY p.driver_id,p.name ORDER BY total_damage DESC`,
   start:`SELECT p.name, COUNT(pa.report_no) AS num_accidents, SUM(pa.damage_amount) AS total_damage\nFROM Person p\n  JOIN Participated pa ON p.driver_id = pa.driver_id\nGROUP BY p.driver_id, p.name\nORDER BY total_damage DESC;`,
   hints:['Join Person and Participated on driver_id. Group by driver to aggregate.','COUNT(pa.report_no) = accidents per person. SUM(pa.damage_amount) = total damage.','<code>SELECT p.name, COUNT(pa.report_no) AS num_accidents, SUM(pa.damage_amount) AS total_damage\nFROM Person p\n  JOIN Participated pa ON p.driver_id = pa.driver_id\nGROUP BY p.driver_id, p.name\nORDER BY total_damage DESC;</code>']},
  {id:7,title:'Drivers with Multiple Accidents',ctx:'📋 Exam 2021',
   q:`Find the <code>name</code> and <code>address</code> of all drivers who have been involved in <b>more than 1 accident</b> using the Insurance database.`,
   type:'select',extra:DB_INS + "\nINSERT INTO Participated VALUES('D001','MAY3001','YJK-100',1000);",
   exp:`SELECT p.name, p.address FROM Person p JOIN Participated pa ON p.driver_id=pa.driver_id GROUP BY p.driver_id, p.name, p.address HAVING COUNT(pa.report_no) > 1`,
   start:`SELECT p.name, p.address\nFROM Person p\n  JOIN Participated pa ON p.driver_id = pa.driver_id\nGROUP BY p.driver_id, p.name, p.address\nHAVING -- count of accidents > 1;`,
   hints:['Group by driver details (id, name, address) and filter using HAVING.','The count filter is: <code>HAVING COUNT(pa.report_no) > 1</code>','<code>SELECT p.name, p.address\nFROM Person p\n  JOIN Participated pa ON p.driver_id = pa.driver_id\nGROUP BY p.driver_id, p.name, p.address\nHAVING COUNT(pa.report_no) > 1;</code>']},
  {id:8,title:'Division — Completed All CSE Courses',ctx:'📋 Exam 2020',
   q:`Find the names of students who have taken <b>every course</b> offered by the <b>'CSE'</b> department.`,
   type:'select',extra:DB_UNI,
   exp:`SELECT name FROM student s WHERE NOT EXISTS (SELECT course_id FROM course WHERE dept_name='CSE' EXCEPT SELECT course_id FROM takes WHERE ID=s.ID)`,
   start:`SELECT name\nFROM student s\nWHERE NOT EXISTS (\n  -- CSE courses EXCEPT courses taken by student s\n  SELECT course_id FROM course WHERE dept_name = 'CSE'\n  EXCEPT\n  SELECT course_id FROM takes WHERE ID = s.ID\n);`,
   hints:['This is a SQL division query. You want to check that the set of all CSE courses EXCEPT the set of courses taken by student s is empty.','EXCEPT operator: <code>SELECT course_id FROM course WHERE dept_name = \'CSE\' EXCEPT SELECT course_id FROM takes WHERE ID = s.ID</code>','<code>SELECT name FROM student s\nWHERE NOT EXISTS (\n  SELECT course_id FROM course WHERE dept_name = \'CSE\'\n  EXCEPT\n  SELECT course_id FROM takes WHERE ID = s.ID\n);</code>']}
]}
];
