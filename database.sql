CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--SET TIME ZONE 'Europe/Moscow'; --не забыть в конф изменить
SELECT CURRENT_TIMESTAMP;

-- Создание таблицы "Категории курсов"
CREATE TABLE Categories (
    category_id SERIAL CONSTRAINT pk_categories PRIMARY KEY,
    title VARCHAR(32) NOT NULL
);

-- Создание таблицы "Пользователи" с UUID
CREATE TABLE Users (
    user_id UUID CONSTRAINT pk_users PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(64),
    email VARCHAR(64) NOT NULL,
    isadmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(64) NOT NULL,
    registration_at DATE,
    about TEXT
);

-- Создание таблицы "Курсы"
CREATE TABLE Courses (
    course_id SERIAL CONSTRAINT pk_courses PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) CHECK (price >= 0),
    category_id INTEGER CONSTRAINT fk_courses_categories REFERENCES Categories(category_id)
);

-- Создание таблицы "Покупки" с UUID
CREATE TABLE Purchases (
    purchase_id UUID CONSTRAINT pk_purchases PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id UUID CONSTRAINT fk_purchases_users REFERENCES Users(user_id),
    course_id INTEGER CONSTRAINT fk_purchases_courses REFERENCES Courses(course_id)
);

-- Создание таблицы "Психотерапевт"
--CREATE TABLE Therapist (
--    therapist_id SERIAL CONSTRAINT pk_therapist PRIMARY KEY,
--    name VARCHAR(64) NOT NULL,
--    contact_information TEXT
--);

-- Создание таблицы "Записи к психотерапевту"
CREATE TABLE TherapistAppointments (
    appointment_id SERIAL CONSTRAINT pk_therapist_appointments PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    user_id UUID,
    connect_method TEXT,
    message TEXT
);

-- Создание таблицы "Комментарии к курсам"
CREATE TABLE CourseComments (
    comment_id SERIAL CONSTRAINT pk_course_comments PRIMARY KEY,
    comment_text TEXT,
    comment_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id UUID CONSTRAINT fk_course_comments_users REFERENCES Users(user_id),
    course_id INTEGER CONSTRAINT fk_course_comments_courses REFERENCES Courses(course_id)
);

-- Создание таблицы "Доступы пользователей к курсам"
CREATE TABLE UserAccessCourses (
    user_id UUID CONSTRAINT fk_access_users REFERENCES Users(user_id),
    course_id INTEGER CONSTRAINT fk_access_courses REFERENCES Courses(course_id)
);

-- Триггер для добавления пользователя и курса в таблицу access
CREATE OR REPLACE FUNCTION add_user_course_access()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO UserAccessCourses (user_id, course_id)
    VALUES (NEW.user_id, NEW.course_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_add_user_course_access
AFTER INSERT ON Purchases
FOR EACH ROW
EXECUTE FUNCTION add_user_course_access();

-- Процедуры для создания, удаления, обновления курсов и пользователей (просто для воды диплома)

-- Создание пользователя
CREATE OR REPLACE FUNCTION create_user(
    _name VARCHAR(64),
    _email VARCHAR(64),
    _isadmin BOOLEAN,
    _password VARCHAR(64),
    _about TEXT
)
RETURNS UUID AS $$
DECLARE
    _user_id UUID;
BEGIN
    INSERT INTO Users (name, email, isadmin, password, registration_at, about)
    VALUES (_name, _email, _isadmin, _password, CURRENT_DATE, _about)
    RETURNING user_id INTO _user_id;
    RETURN _user_id;
END;
$$ LANGUAGE plpgsql;

-- Удаление пользователя
CREATE OR REPLACE FUNCTION delete_user(_user_id UUID)
RETURNS VOID AS $$
BEGIN
    DELETE FROM Users WHERE user_id = _user_id;
END;
$$ LANGUAGE plpgsql;

-- Обновление пользователя
CREATE OR REPLACE FUNCTION update_user(
    _user_id UUID,
    _name VARCHAR(64),
    _email VARCHAR(64),
    _isadmin BOOLEAN,
    _password VARCHAR(64),
    _about TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE Users
    SET name = _name, email = _email, isadmin = _isadmin, password = _password, about = _about
    WHERE user_id = _user_id;
END;
$$ LANGUAGE plpgsql;

-- Создание курса
CREATE OR REPLACE FUNCTION create_course(
    _title VARCHAR(64),
    _description TEXT,
    _price DECIMAL(10,2),
    _category_id INTEGER
)
RETURNS INTEGER AS $$
DECLARE
    _course_id INTEGER;
BEGIN
    INSERT INTO Courses (title, description, price, category_id)
    VALUES (_title, _description, _price, _category_id)
    RETURNING course_id INTO _course_id;
    RETURN _course_id;
END;
$$ LANGUAGE plpgsql;

-- Удаление курса
CREATE OR REPLACE FUNCTION delete_course(_course_id INTEGER)
RETURNS VOID AS $$
BEGIN
    DELETE FROM Courses WHERE course_id = _course_id;
END;
$$ LANGUAGE plpgsql;

-- Обновление курса
CREATE OR REPLACE FUNCTION update_course(
    _course_id INTEGER,
    _title VARCHAR(64),
    _description TEXT,
    _price DECIMAL(10,2),
    _category_id INTEGER
)
RETURNS VOID AS $$
BEGIN
    UPDATE Courses
    SET title = _title, description = _description, price = _price, category_id = _category_id
    WHERE course_id = _course_id;
END;
$$ LANGUAGE plpgsql;

-- Вьюшка для просмотра записей к психотерапевтам
CREATE VIEW TherapistAppointmentsView AS
SELECT
    ta.appointment_id,
    ta.username,
    ta.user_id,
    ta.connect_method,
    ta.message,
    t.name AS therapist_name,
    t.contact_information
FROM TherapistAppointments ta
JOIN Therapist t ON ta.therapist_id = t.therapist_id;
