PGDMP     '    5                x            api_node    12.4 (Debian 12.4-1.pgdg100+1) #   12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)     e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            h           1262    16404    api_node    DATABASE     x   CREATE DATABASE api_node WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';
    DROP DATABASE api_node;
                postgres    false            �            1259    16434    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    email_address character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    birth_date timestamp with time zone,
    ic_number character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    password character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16432    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    208            i           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    207            �
           2604    16437    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208            b          0    16434    users 
   TABLE DATA           �   COPY public.users (id, email_address, first_name, last_name, birth_date, ic_number, "createdAt", "updatedAt", password) FROM stdin;
    public          postgres    false    208   �       j           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    207            �
           2606    16442    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    208            b   �   x�M�A�0����+<x��okK�S	!�����g&IԯOo�{{x9r��zSs�m����Sk��Qfj��R�� \x,� s+ Tf��p��Bj�P�E�i���@��|~�������=ҵ:�A�W_���t�-�����l�6N�O��"o�K�1�`�.U     