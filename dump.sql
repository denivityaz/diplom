--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: add_user_course_access(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_user_course_access() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO UsercAccessCourses (user_id, course_id)
    VALUES (NEW.user_id, NEW.course_id);
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.add_user_course_access() OWNER TO postgres;

--
-- Name: create_comment(text, uuid, integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.create_comment(IN p_comment_text text, IN p_user_id uuid, IN p_course_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO CourseComments (comment_text, user_id, course_id)
    VALUES (p_comment_text, p_user_id, p_course_id);
END;
$$;


ALTER PROCEDURE public.create_comment(IN p_comment_text text, IN p_user_id uuid, IN p_course_id integer) OWNER TO postgres;

--
-- Name: create_course(character varying, numeric, text, text, text, integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.create_course(IN p_title character varying, IN p_price numeric, IN p_description text, IN p_demo_path text, IN p_full_path text, IN p_category_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO Courses (title, price, description, demo_path, full_path, category_id)
    VALUES (p_title, p_price, p_description, p_demo_path, p_full_path, p_category_id);
END;
$$;


ALTER PROCEDURE public.create_course(IN p_title character varying, IN p_price numeric, IN p_description text, IN p_demo_path text, IN p_full_path text, IN p_category_id integer) OWNER TO postgres;

--
-- Name: create_user(character varying, character varying, boolean, text, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.create_user(IN p_name character varying, IN p_email character varying, IN p_isadmin boolean, IN p_hashed_password text, IN p_about text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO Users (name, email, isadmin, hashed_password, about)
    VALUES (p_name, p_email, p_isadmin, p_hashed_password, p_about);
END;
$$;


ALTER PROCEDURE public.create_user(IN p_name character varying, IN p_email character varying, IN p_isadmin boolean, IN p_hashed_password text, IN p_about text) OWNER TO postgres;

--
-- Name: delete_comment(integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.delete_comment(IN p_comment_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM CourseComments WHERE comment_id = p_comment_id;
END;
$$;


ALTER PROCEDURE public.delete_comment(IN p_comment_id integer) OWNER TO postgres;

--
-- Name: delete_course(integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.delete_course(IN p_course_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM Courses WHERE course_id = p_course_id;
END;
$$;


ALTER PROCEDURE public.delete_course(IN p_course_id integer) OWNER TO postgres;

--
-- Name: delete_user(uuid); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.delete_user(IN p_user_id uuid)
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM Users WHERE user_id = p_user_id;
END;
$$;


ALTER PROCEDURE public.delete_user(IN p_user_id uuid) OWNER TO postgres;

--
-- Name: get_course_comments(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_course_comments(p_course_id integer) RETURNS TABLE(comment_id integer, comment_text text, comment_time timestamp with time zone, user_id uuid)
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


ALTER FUNCTION public.get_course_comments(p_course_id integer) OWNER TO postgres;

--
-- Name: update_course(integer, character varying, numeric, text, text, text, integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.update_course(IN p_course_id integer, IN p_title character varying, IN p_price numeric, IN p_description text, IN p_demo_path text, IN p_full_path text, IN p_category_id integer)
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


ALTER PROCEDURE public.update_course(IN p_course_id integer, IN p_title character varying, IN p_price numeric, IN p_description text, IN p_demo_path text, IN p_full_path text, IN p_category_id integer) OWNER TO postgres;

--
-- Name: update_user(uuid, character varying, character varying, boolean, text, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.update_user(IN p_user_id uuid, IN p_name character varying, IN p_email character varying, IN p_isadmin boolean, IN p_hashed_password text, IN p_about text)
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


ALTER PROCEDURE public.update_user(IN p_user_id uuid, IN p_name character varying, IN p_email character varying, IN p_isadmin boolean, IN p_hashed_password text, IN p_about text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    appointment_id integer NOT NULL,
    name text NOT NULL,
    user_id uuid,
    connect_way text,
    message text
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_appointment_id_seq OWNER TO postgres;

--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_appointment_id_seq OWNED BY public.appointments.appointment_id;


--
-- Name: appointmentsview; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.appointmentsview AS
 SELECT appointment_id,
    name,
    user_id,
    connect_way,
    message
   FROM public.appointments;


ALTER VIEW public.appointmentsview OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    title character varying(32) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: coursecomments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coursecomments (
    comment_id integer NOT NULL,
    comment_text text NOT NULL,
    comment_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id uuid NOT NULL,
    course_id integer NOT NULL
);


ALTER TABLE public.coursecomments OWNER TO postgres;

--
-- Name: coursecomments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coursecomments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coursecomments_comment_id_seq OWNER TO postgres;

--
-- Name: coursecomments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coursecomments_comment_id_seq OWNED BY public.coursecomments.comment_id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    course_id integer NOT NULL,
    title character varying(64) NOT NULL,
    price numeric(10,2),
    description text NOT NULL,
    demo_path text,
    full_path text,
    category_id integer,
    CONSTRAINT courses_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: courses_course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_course_id_seq OWNER TO postgres;

--
-- Name: courses_course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_course_id_seq OWNED BY public.courses.course_id;


--
-- Name: purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchases (
    purchase_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    purchase_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    detail text,
    user_id uuid NOT NULL,
    course_id integer NOT NULL
);


ALTER TABLE public.purchases OWNER TO postgres;

--
-- Name: usercaccesscourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usercaccesscourses (
    user_id uuid NOT NULL,
    course_id integer NOT NULL
);


ALTER TABLE public.usercaccesscourses OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(128) NOT NULL,
    email character varying(64) NOT NULL,
    isadmin boolean DEFAULT false,
    hashed_password text NOT NULL,
    registration_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    about text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: appointments appointment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointments_appointment_id_seq'::regclass);


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: coursecomments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursecomments ALTER COLUMN comment_id SET DEFAULT nextval('public.coursecomments_comment_id_seq'::regclass);


--
-- Name: courses course_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN course_id SET DEFAULT nextval('public.courses_course_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (appointment_id, name, user_id, connect_way, message) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, title) FROM stdin;
\.


--
-- Data for Name: coursecomments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coursecomments (comment_id, comment_text, comment_time, user_id, course_id) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (course_id, title, price, description, demo_path, full_path, category_id) FROM stdin;
\.


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchases (purchase_id, purchase_time, detail, user_id, course_id) FROM stdin;
\.


--
-- Data for Name: usercaccesscourses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usercaccesscourses (user_id, course_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, email, isadmin, hashed_password, registration_at, about) FROM stdin;
\.


--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_appointment_id_seq', 1, false);


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 1, false);


--
-- Name: coursecomments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coursecomments_comment_id_seq', 1, false);


--
-- Name: courses_course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_course_id_seq', 1, false);


--
-- Name: categories pk_categories; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT pk_categories PRIMARY KEY (category_id);


--
-- Name: coursecomments pk_course_comments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursecomments
    ADD CONSTRAINT pk_course_comments PRIMARY KEY (comment_id);


--
-- Name: courses pk_courses; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT pk_courses PRIMARY KEY (course_id);


--
-- Name: purchases pk_purchases; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT pk_purchases PRIMARY KEY (purchase_id);


--
-- Name: appointments pk_therapist_appointments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT pk_therapist_appointments PRIMARY KEY (appointment_id);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (user_id);


--
-- Name: purchases trg_add_user_course_access; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_add_user_course_access AFTER INSERT ON public.purchases FOR EACH ROW EXECUTE FUNCTION public.add_user_course_access();


--
-- Name: usercaccesscourses fk_access_courses; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usercaccesscourses
    ADD CONSTRAINT fk_access_courses FOREIGN KEY (course_id) REFERENCES public.courses(course_id);


--
-- Name: usercaccesscourses fk_access_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usercaccesscourses
    ADD CONSTRAINT fk_access_users FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: coursecomments fk_course_comments_courses; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursecomments
    ADD CONSTRAINT fk_course_comments_courses FOREIGN KEY (course_id) REFERENCES public.courses(course_id);


--
-- Name: coursecomments fk_course_comments_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursecomments
    ADD CONSTRAINT fk_course_comments_users FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: courses fk_courses_categories; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT fk_courses_categories FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- Name: purchases fk_purchases_courses; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT fk_purchases_courses FOREIGN KEY (course_id) REFERENCES public.courses(course_id);


--
-- Name: purchases fk_purchases_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT fk_purchases_users FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: appointments fk_purchases_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT fk_purchases_users FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

