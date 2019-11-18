--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg16.04+1)
-- Dumped by pg_dump version 11.5

-- Started on 2019-11-10 05:42:14 CST

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

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 16115487)
-- Name: centro_votacion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.centro_votacion (
    id_centro_votacion integer NOT NULL,
    nombre_centro_votacion character varying(128) NOT NULL,
    direccion_centro_votacion character varying(1024)
);


--
-- TOC entry 196 (class 1259 OID 16115485)
-- Name: centro_votacion_id_centro_votacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.centro_votacion_id_centro_votacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3896 (class 0 OID 0)
-- Dependencies: 196
-- Name: centro_votacion_id_centro_votacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.centro_votacion_id_centro_votacion_seq OWNED BY public.centro_votacion.id_centro_votacion;


--
-- TOC entry 199 (class 1259 OID 16115498)
-- Name: mesa; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mesa (
    id_mesa integer NOT NULL,
    id_votacion integer NOT NULL,
    id_centro_votacion integer NOT NULL,
    numero_mesa integer NOT NULL,
    ponderacion_mesa numeric(4,3),
    cantidad_abstenciones_mesa integer NOT NULL,
    cantidad_anulados_mesa integer NOT NULL,
    habilitada_mesa boolean NOT NULL,
    en_uso_mesa boolean NOT NULL,
    ip_mesa character varying(16) NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 16115496)
-- Name: mesa_id_mesa_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mesa_id_mesa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3897 (class 0 OID 0)
-- Dependencies: 198
-- Name: mesa_id_mesa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mesa_id_mesa_seq OWNED BY public.mesa.id_mesa;


--
-- TOC entry 201 (class 1259 OID 16115506)
-- Name: nivel_centro_votacion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nivel_centro_votacion (
    id_nivel_centro_votacion integer NOT NULL,
    id_centro_votacion integer NOT NULL,
    id_nivel integer NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 16115504)
-- Name: nivel_centro_votacion_id_nivel_centro_votacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.nivel_centro_votacion_id_nivel_centro_votacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3898 (class 0 OID 0)
-- Dependencies: 200
-- Name: nivel_centro_votacion_id_nivel_centro_votacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.nivel_centro_votacion_id_nivel_centro_votacion_seq OWNED BY public.nivel_centro_votacion.id_nivel_centro_votacion;


--
-- TOC entry 203 (class 1259 OID 16115514)
-- Name: ordenamiento; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ordenamiento (
    id_ordenamiento integer NOT NULL,
    nombre_ordenamiento character varying(128) NOT NULL,
    descripcion_ordenamiento character varying(1024)
);


--
-- TOC entry 202 (class 1259 OID 16115512)
-- Name: ordenamiento_id_ordenamiento_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ordenamiento_id_ordenamiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 202
-- Name: ordenamiento_id_ordenamiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ordenamiento_id_ordenamiento_seq OWNED BY public.ordenamiento.id_ordenamiento;


--
-- TOC entry 205 (class 1259 OID 16115525)
-- Name: tipo_votacion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipo_votacion (
    id_tipo_votacion integer NOT NULL,
    nombre_tipo_votacion character varying(128) NOT NULL,
    descripcion_tipo_votacion character varying(1024)
);


--
-- TOC entry 204 (class 1259 OID 16115523)
-- Name: tipo_votacion_id_tipo_votacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tipo_votacion_id_tipo_votacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 204
-- Name: tipo_votacion_id_tipo_votacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tipo_votacion_id_tipo_votacion_seq OWNED BY public.tipo_votacion.id_tipo_votacion;


--
-- TOC entry 207 (class 1259 OID 16115536)
-- Name: votacion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votacion (
    id_votacion integer NOT NULL,
    id_tipo_votacion integer NOT NULL,
    id_ordenamiento integer NOT NULL,
    fecha_inicio_votacion timestamp with time zone NOT NULL,
    fecha_fin_votacion timestamp with time zone NOT NULL,
    nombre_votacion character varying(128) NOT NULL,
    descripcion_votacion character varying(1024)
);


--
-- TOC entry 206 (class 1259 OID 16115534)
-- Name: votacion_id_votacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.votacion_id_votacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 206
-- Name: votacion_id_votacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.votacion_id_votacion_seq OWNED BY public.votacion.id_votacion;


--
-- TOC entry 3735 (class 2604 OID 16115490)
-- Name: centro_votacion id_centro_votacion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.centro_votacion ALTER COLUMN id_centro_votacion SET DEFAULT nextval('public.centro_votacion_id_centro_votacion_seq'::regclass);


--
-- TOC entry 3736 (class 2604 OID 16115501)
-- Name: mesa id_mesa; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mesa ALTER COLUMN id_mesa SET DEFAULT nextval('public.mesa_id_mesa_seq'::regclass);


--
-- TOC entry 3737 (class 2604 OID 16115509)
-- Name: nivel_centro_votacion id_nivel_centro_votacion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nivel_centro_votacion ALTER COLUMN id_nivel_centro_votacion SET DEFAULT nextval('public.nivel_centro_votacion_id_nivel_centro_votacion_seq'::regclass);


--
-- TOC entry 3738 (class 2604 OID 16115517)
-- Name: ordenamiento id_ordenamiento; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ordenamiento ALTER COLUMN id_ordenamiento SET DEFAULT nextval('public.ordenamiento_id_ordenamiento_seq'::regclass);


--
-- TOC entry 3739 (class 2604 OID 16115528)
-- Name: tipo_votacion id_tipo_votacion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_votacion ALTER COLUMN id_tipo_votacion SET DEFAULT nextval('public.tipo_votacion_id_tipo_votacion_seq'::regclass);


--
-- TOC entry 3740 (class 2604 OID 16115539)
-- Name: votacion id_votacion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votacion ALTER COLUMN id_votacion SET DEFAULT nextval('public.votacion_id_votacion_seq'::regclass);


--
-- TOC entry 3880 (class 0 OID 16115487)
-- Dependencies: 197
-- Data for Name: centro_votacion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.centro_votacion (id_centro_votacion, nombre_centro_votacion, direccion_centro_votacion) VALUES (1, 'Cede Central', 'San Salvador, Ave. Roosevelt, 25');
INSERT INTO public.centro_votacion (id_centro_votacion, nombre_centro_votacion, direccion_centro_votacion) VALUES (2, 'Edificio el Pedregal', 'Antiguo Cuscatlan, Plan de la Laguna, 30');


--
-- TOC entry 3882 (class 0 OID 16115498)
-- Dependencies: 199
-- Data for Name: mesa; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.mesa (id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa) VALUES (1, 1, 1, 1, 0.167, 0, 0, false, false, '128.2.1.1');
INSERT INTO public.mesa (id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa) VALUES (2, 1, 1, 2, 0.167, 0, 0, false, false, '128.2.2.1');
INSERT INTO public.mesa (id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa) VALUES (3, 1, 1, 3, 0.167, 0, 0, false, false, '128.2.3.1');
INSERT INTO public.mesa (id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa) VALUES (4, 1, 2, 1, 0.167, 0, 1, false, false, '128.3.1.1');
INSERT INTO public.mesa (id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa) VALUES (5, 1, 2, 2, 0.167, 0, 0, false, false, '128.3.2.1');
INSERT INTO public.mesa (id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa) VALUES (6, 1, 2, 3, 0.167, 0, 1, false, false, '128.3.3.1');


--
-- TOC entry 3884 (class 0 OID 16115506)
-- Dependencies: 201
-- Data for Name: nivel_centro_votacion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.nivel_centro_votacion (id_nivel_centro_votacion, id_centro_votacion, id_nivel) VALUES (1, 1, 2);
INSERT INTO public.nivel_centro_votacion (id_nivel_centro_votacion, id_centro_votacion, id_nivel) VALUES (2, 2, 3);


--
-- TOC entry 3886 (class 0 OID 16115514)
-- Dependencies: 203
-- Data for Name: ordenamiento; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ordenamiento (id_ordenamiento, nombre_ordenamiento, descripcion_ordenamiento) VALUES (1, 'Alfabetico Ascendente', 'Ordena de la A la Z');
INSERT INTO public.ordenamiento (id_ordenamiento, nombre_ordenamiento, descripcion_ordenamiento) VALUES (2, 'Alfabetico Descendente', 'Ordena de la Z a la A');
INSERT INTO public.ordenamiento (id_ordenamiento, nombre_ordenamiento, descripcion_ordenamiento) VALUES (3, 'Azar', 'Ordena en forma aleatoria');


--
-- TOC entry 3888 (class 0 OID 16115525)
-- Dependencies: 205
-- Data for Name: tipo_votacion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.tipo_votacion (id_tipo_votacion, nombre_tipo_votacion, descripcion_tipo_votacion) VALUES (1, 'Absoluta', 'Gana el que obtiene màs votos');
INSERT INTO public.tipo_votacion (id_tipo_votacion, nombre_tipo_votacion, descripcion_tipo_votacion) VALUES (2, 'Ponderada', 'Los votos ponderan por sector');


--
-- TOC entry 3890 (class 0 OID 16115536)
-- Dependencies: 207
-- Data for Name: votacion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.votacion (id_votacion, id_tipo_votacion, id_ordenamiento, fecha_inicio_votacion, fecha_fin_votacion, nombre_votacion, descripcion_votacion) VALUES (1, 2, 3, '2019-10-01 08:00:00+00', '2019-12-31 20:00:00+00', 'Representantes de Sindicato', 'Elecciones para determinar quien representará los sindicatos de nuestra empresa');


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 196
-- Name: centro_votacion_id_centro_votacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.centro_votacion_id_centro_votacion_seq', 2, true);


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 198
-- Name: mesa_id_mesa_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.mesa_id_mesa_seq', 6, true);


--
-- TOC entry 3904 (class 0 OID 0)
-- Dependencies: 200
-- Name: nivel_centro_votacion_id_nivel_centro_votacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.nivel_centro_votacion_id_nivel_centro_votacion_seq', 2, true);


--
-- TOC entry 3905 (class 0 OID 0)
-- Dependencies: 202
-- Name: ordenamiento_id_ordenamiento_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ordenamiento_id_ordenamiento_seq', 3, true);


--
-- TOC entry 3906 (class 0 OID 0)
-- Dependencies: 204
-- Name: tipo_votacion_id_tipo_votacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tipo_votacion_id_tipo_votacion_seq', 2, true);


--
-- TOC entry 3907 (class 0 OID 0)
-- Dependencies: 206
-- Name: votacion_id_votacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.votacion_id_votacion_seq', 1, true);


--
-- TOC entry 3742 (class 2606 OID 16115495)
-- Name: centro_votacion pk_centro_votacion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.centro_votacion
    ADD CONSTRAINT pk_centro_votacion PRIMARY KEY (id_centro_votacion);


--
-- TOC entry 3744 (class 2606 OID 16115503)
-- Name: mesa pk_mesa; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT pk_mesa PRIMARY KEY (id_mesa);


--
-- TOC entry 3746 (class 2606 OID 16115511)
-- Name: nivel_centro_votacion pk_nivel_centro_votacion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nivel_centro_votacion
    ADD CONSTRAINT pk_nivel_centro_votacion PRIMARY KEY (id_nivel_centro_votacion);


--
-- TOC entry 3748 (class 2606 OID 16115522)
-- Name: ordenamiento pk_ordenamiento; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ordenamiento
    ADD CONSTRAINT pk_ordenamiento PRIMARY KEY (id_ordenamiento);


--
-- TOC entry 3750 (class 2606 OID 16115533)
-- Name: tipo_votacion pk_tipo_votacion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_votacion
    ADD CONSTRAINT pk_tipo_votacion PRIMARY KEY (id_tipo_votacion);


--
-- TOC entry 3752 (class 2606 OID 16115544)
-- Name: votacion pk_votacion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votacion
    ADD CONSTRAINT pk_votacion PRIMARY KEY (id_votacion);


--
-- TOC entry 3754 (class 2606 OID 16115550)
-- Name: mesa fk_mesa_relations_centro_v; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT fk_mesa_relations_centro_v FOREIGN KEY (id_centro_votacion) REFERENCES public.centro_votacion(id_centro_votacion) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3753 (class 2606 OID 16115545)
-- Name: mesa fk_mesa_relations_votacion; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT fk_mesa_relations_votacion FOREIGN KEY (id_votacion) REFERENCES public.votacion(id_votacion) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3755 (class 2606 OID 16115555)
-- Name: nivel_centro_votacion fk_nivel_ce_relations_centro_v; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nivel_centro_votacion
    ADD CONSTRAINT fk_nivel_ce_relations_centro_v FOREIGN KEY (id_centro_votacion) REFERENCES public.centro_votacion(id_centro_votacion) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3757 (class 2606 OID 16115565)
-- Name: votacion fk_votacion_relations_ordenami; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votacion
    ADD CONSTRAINT fk_votacion_relations_ordenami FOREIGN KEY (id_ordenamiento) REFERENCES public.ordenamiento(id_ordenamiento) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3756 (class 2606 OID 16115560)
-- Name: votacion fk_votacion_relations_tipo_vot; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votacion
    ADD CONSTRAINT fk_votacion_relations_tipo_vot FOREIGN KEY (id_tipo_votacion) REFERENCES public.tipo_votacion(id_tipo_votacion) ON UPDATE RESTRICT ON DELETE RESTRICT;


-- Completed on 2019-11-10 05:42:28 CST

--
-- PostgreSQL database dump complete
--

