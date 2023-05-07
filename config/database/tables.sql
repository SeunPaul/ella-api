CREATE EXTENSION "uuid-ossp";

CREATE TABLE users (
  id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(), 
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at DATE
);

CREATE TABLE diagnosis(
  id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  patient_name TEXT NOT NULL,
  patient_age SMALLINT NOT NULL,
  status_code TEXT,
  diagnosis_outcome TEXT,
  comment TEXT,
  created_at DATE
);