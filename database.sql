CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--SET TIME ZONE 'Europe/Moscow';
--SELECT CURRENT_TIMESTAMP;

-- Создание таблицы "Категории курсов"
CREATE TABLE Categories (
    category_id SERIAL CONSTRAINT pk_categories PRIMARY KEY,
    title VARCHAR(32) NOT NULL
);

-- Создание таблицы "Пользователи" с UUID
CREATE TABLE Users (
    user_id UUID CONSTRAINT pk_users PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(128) NOT NULL,
    email VARCHAR(64) NOT NULL,
    isadmin BOOLEAN DEFAUL FALSE,
    hashed_password TEXT NOT NULL,
    registration_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
 	about TEXT
);

-- Создание таблицы "Курсы"
CREATE TABLE Courses (
    course_id SERIAL CONSTRAINT pk_courses PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    price DECIMAL(10,2) CHECK (price >= 0),
    description TEXT NOT NULL,
    demo_path TEXT,
    full_path TEXT,
    category_id INTEGER CONSTRAINT fk_courses_categories REFERENCES Categories(category_id)
);

-- Создание таблицы "Покупки" с UUID
CREATE TABLE Purchases (
    purchase_id UUID CONSTRAINT pk_purchases PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    detail TEXT,
    user_id UUID CONSTRAINT fk_purchases_users REFERENCES Users(user_id) NOT NULL,
    course_id INTEGER CONSTRAINT fk_purchases_courses REFERENCES Courses(course_id) NOT NULL
);

-- Создание таблицы "Записи к психотерапевту"
CREATE TABLE Appointments (
    appointment_id SERIAL CONSTRAINT pk_therapist_appointments PRIMARY KEY,
	name TEXT NOT NULL,
	user_id UUID CONSTRAINT fk_purchases_users REFERENCES Users(user_id), 
    -- Если человек авторизован, будет отправляться с фронта 
    connect_way TEXT,
    message TEXT
);

-- Создание таблицы "Комментарии к курсам"
CREATE TABLE CourseComments (
    comment_id SERIAL CONSTRAINT pk_course_comments PRIMARY KEY,
    comment_text TEXT NOT NULL,
    comment_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id UUID CONSTRAINT fk_course_comments_users REFERENCES Users(user_id) NOT NULL,
    course_id INTEGER CONSTRAINT fk_course_comments_courses REFERENCES Courses(course_id) NOT NULL
);

-- Создание таблицы "Доступ пользователей к курсам"
create table UsercAccessCourses (
 user_id uuid CONSTRAINT fk_access_users REFERENCES Users(user_id) NOT NULL,
 course_id INTEGER CONSTRAINT fk_access_courses REFERENCES Courses(course_id) NOT NULL
);


-- Триггер для добавления пользователя и курса в таблицу access
-- Функция триггера
CREATE OR REPLACE FUNCTION add_user_course_access()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO UsercAccessCourses (user_id, course_id)
    VALUES (NEW.user_id, NEW.course_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создание триггера
CREATE TRIGGER trg_add_user_course_access
AFTER INSERT ON Purchases
FOR EACH ROW
EXECUTE FUNCTION add_user_course_access();


-- Процедуры для создания, удаления, обновления курсов, пользователей, комментариев
CREATE OR REPLACE PROCEDURE create_course(
    p_title VARCHAR,
    p_price DECIMAL,
    p_description TEXT,
    p_demo_path TEXT,
    p_full_path TEXT,
    p_category_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Courses (title, price, description, demo_path, full_path, category_id)
    VALUES (p_title, p_price, p_description, p_demo_path, p_full_path, p_category_id);
END;
$$;


CREATE OR REPLACE PROCEDURE delete_course(p_course_id INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Courses WHERE course_id = p_course_id;
END;
$$;


CREATE OR REPLACE PROCEDURE update_course(
    p_course_id INTEGER,
    p_title VARCHAR,
    p_price DECIMAL,
    p_description TEXT,
    p_demo_path TEXT,
    p_full_path TEXT,
    p_category_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Courses
    SET title = p_title,
        price = p_price,
        description = p_description,
        demo_path = p_demo_path,
        full_path = p_full_path,
        category_id = p_category_id
    WHERE course_id = p_course_id;
END;
$$;




CREATE OR REPLACE PROCEDURE create_user(
    p_name VARCHAR,
    p_email VARCHAR,
    p_isadmin BOOLEAN,
    p_hashed_password TEXT,
    p_about TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Users (name, email, isadmin, hashed_password, about)
    VALUES (p_name, p_email, p_isadmin, p_hashed_password, p_about);
END;
$$;


CREATE OR REPLACE PROCEDURE delete_user(p_user_id UUID)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Users WHERE user_id = p_user_id;
END;
$$;


CREATE OR REPLACE PROCEDURE update_user(
    p_user_id UUID,
    p_name VARCHAR,
    p_email VARCHAR,
    p_isadmin BOOLEAN,
    p_hashed_password TEXT,
    p_about TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Users
    SET name = p_name,
        email = p_email,
        isadmin = p_isadmin,
        hashed_password = p_hashed_password,
        about = p_about
    WHERE user_id = p_user_id;
END;
$$;



CREATE OR REPLACE PROCEDURE create_comment(
    p_comment_text TEXT,
    p_user_id UUID,
    p_course_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO CourseComments (comment_text, user_id, course_id)
    VALUES (p_comment_text, p_user_id, p_course_id);
END;
$$;


CREATE OR REPLACE PROCEDURE delete_comment(p_comment_id INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM CourseComments WHERE comment_id = p_comment_id;
END;
$$;



-- Вьюшка для просмотра записей к психотерапевту
CREATE VIEW AppointmentsView AS
SELECT 
    appointment_id,
    name,
    user_id,
    connect_way,
    message
FROM 
    Appointments;



-- Процедура для отображения на сайте комментариев к курсам 
CREATE OR REPLACE FUNCTION get_course_comments(p_course_id INTEGER)
RETURNS TABLE (
    comment_id INTEGER,
    comment_text TEXT,
    comment_time TIMESTAMPTZ,
    user_id UUID
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        comment_id,
        comment_text,
        comment_time,
        user_id
    FROM 
        CourseComments
    WHERE 
        course_id = p_course_id;
END;
$$;




