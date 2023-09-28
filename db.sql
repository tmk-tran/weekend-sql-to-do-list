--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

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
-- Name: list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.list (
    id integer NOT NULL,
    task character varying(80) NOT NULL,
    description character varying(120),
    priority character varying(1),
    notes character varying(120),
    complete boolean DEFAULT false,
    completed_date timestamp without time zone
);


--
-- Name: list_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.list_id_seq OWNED BY public.list.id;


--
-- Name: list id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.list ALTER COLUMN id SET DEFAULT nextval('public.list_id_seq'::regclass);


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (2, 'Laundry', NULL, 'M', NULL, false, NULL);
INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (3, 'Brush dog', NULL, 'H', NULL, false, NULL);
INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (4, 'Vacuum house', NULL, 'M', NULL, false, NULL);
INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (5, 'HW', NULL, 'H', NULL, false, NULL);
INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (1, 'Dishes', NULL, 'L', NULL, true, '2023-09-17 23:26:04.272');
INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (6, 'Trash', NULL, 'M', NULL, true, '2023-09-17 23:26:07.523');
INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (7, 'Shower', NULL, 'L', NULL, true, '2023-09-17 23:57:45.824');
INSERT INTO public.list (id, task, description, priority, notes, complete, completed_date) VALUES (8, 'Organize garage', NULL, 'M', NULL, false, '2023-09-18 10:35:26.792');


--
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.list_id_seq', 10, true);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

