--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    username character varying(50) NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    password character varying(50)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: complaints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complaints (
    st_username character varying(50),
    category character varying(100),
    description character varying,
    status boolean,
    id integer NOT NULL,
    faculty character varying(10) NOT NULL
);


ALTER TABLE public.complaints OWNER TO postgres;

--
-- Name: complaints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.complaints_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.complaints_id_seq OWNER TO postgres;

--
-- Name: complaints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.complaints_id_seq OWNED BY public.complaints.id;


--
-- Name: internships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.internships (
    internship_name character varying(100) NOT NULL,
    details text NOT NULL,
    faculty character varying(20) NOT NULL,
    applicants character varying[],
    id integer NOT NULL
);


ALTER TABLE public.internships OWNER TO postgres;

--
-- Name: internships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.internships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.internships_id_seq OWNER TO postgres;

--
-- Name: internships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.internships_id_seq OWNED BY public.internships.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    birthdate date NOT NULL,
    faculty character varying(50) NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: complaints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints ALTER COLUMN id SET DEFAULT nextval('public.complaints_id_seq'::regclass);


--
-- Name: internships id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.internships ALTER COLUMN id SET DEFAULT nextval('public.internships_id_seq'::regclass);


--
-- PostgreSQL database dump complete
--

