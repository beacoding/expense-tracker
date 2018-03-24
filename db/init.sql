DROP DATABASE IF EXISTS cc_expense_claims_system;
DROP USER IF EXISTS 'app_user'@'%';

CREATE DATABASE cc_expense_claims_system;
USE cc_expense_claims_system;

CREATE TABLE company (
  id int AUTO_INCREMENT NOT NULL,
  name VARCHAR(80) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE cost_centre (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL UNIQUE, 
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  email VARCHAR(80) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  manager_id INT,
  is_admin BOOLEAN NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  CONSTRAINT CHK_employee CHECK (email <> '' AND password <> '')
);

CREATE TABLE employee_cost_centre (
  employee_id INT NOT NULL,
  cost_centre_id INT NOT NULL,
  approval_limit DECIMAL(10,2),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (employee_id, cost_centre_id),
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  FOREIGN KEY (cost_centre_id) REFERENCES cost_centre(id)
);

CREATE TABLE expense_type (
  id INT AUTO_INCREMENT NOT NULL,
  category VARCHAR(80) NOT NULL, 
  description VARCHAR(255),
  general_ledger INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (category, general_ledger),
  CONSTRAINT CHK_exp_type CHECK (category <> '')
);

CREATE TABLE claim (
  id INT AUTO_INCREMENT NOT NULL,
  claimant_id INT NOT NULL,
  approver_id INT,
  company_id INT NOT NULL,
  cost_centre_id INT NOT NULL,
  description VARCHAR(80) NOT NULL DEFAULT 'Untitled',
  account_number VARCHAR(14),
  notes VARCHAR(255),
  status CHAR(1) NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (claimant_id) REFERENCES employee(id),
  FOREIGN KEY (approver_id) REFERENCES employee(id),
  FOREIGN KEY (company_id) REFERENCES company(id),
  FOREIGN KEY (cost_centre_id) REFERENCES cost_centre(id)
);

CREATE TABLE claim_item (
  id INT AUTO_INCREMENT NOT NULL,
  claim_id INT NOT NULL,
  description VARCHAR(80) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  comment VARCHAR(255) NOT NULL,
  expense_type INT NOT NULL,
  image_url BLOB,
  PRIMARY KEY (id),
  FOREIGN KEY (claim_id) REFERENCES claim(id) ON DELETE CASCADE,
  FOREIGN KEY (expense_type) REFERENCES expense_type(id),
  CONSTRAINT CHK_claim_item CHECK (description <> '' AND amount >= 0.00 AND comment <> '')
);

CREATE TABLE policy (
  id INT AUTO_INCREMENT NOT NULL, 
  name VARCHAR(80) UNIQUE,
  value DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

-- CREATE APPLICATION USER WITH LIMITED PRIVILEGES
CREATE USER 'app_user'@'%' IDENTIFIED BY 'cc_ecs_winter_t2';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.claim TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.claim_item TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.company TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.cost_centre TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.employee TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.employee_cost_centre TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.expense_type TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON cc_expense_claims_system.policy TO 'app_user'@'%';

/*  Execute this file from the command line by typing:
 *    mysql -u root < db/init.sql
 *  to create the database and the tables.*/

