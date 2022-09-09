-- public.message definition

-- Drop table

-- DROP TABLE public.message;

CREATE TABLE public.message (
	id serial4 NOT NULL,
	"date" timestamp NOT NULL DEFAULT now(),
	title varchar NOT NULL,
	"content" varchar NOT NULL,
	CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.message OWNER TO test;
GRANT ALL ON TABLE public.message TO test;

INSERT INTO public.message ("date",title,"content") VALUES
	 ('2022-09-01 08:44:36.152','test 1','test content 1'),
	 ('2022-09-02 10:44:36.162','test 2','test content 2'),
	 ('2022-09-03 09:44:36.185','test 3','test content 3'),
	 ('2022-09-03 09:45:36.19','test 4','test content 4'),
	 ('2022-09-03 09:46:36.196','test 5','test content 5');
