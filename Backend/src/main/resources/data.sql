--Add initial users
insert into public.cities (id, name)
VALUES (1, 'KATOWICE'),
       (2, 'LUBLIN'),
       (3, 'BYDGOSZCZ'),
       (4, 'SZCZECIN'),
       (5, 'GDAŃSK'),
       (6, 'POZNAŃ'),
       (7, 'WROCŁAW'),
       (8, 'ŁÓDŹ'),
       (9, 'KRAKÓW'),
       (10, 'WARSZAWA');

-- USER ROLE
insert into public.roles (id, name)
values (1, 'ROLE_USER');

insert into public.privileges(id, name)
values (1, 'CARS_ADD');
insert into public.roles_privileges (role_id, privilege_id)
values (1, 1);
insert into public.privileges(id, name)
values (2, 'CARS_EDIT');
insert into public.roles_privileges (role_id, privilege_id)
values (1, 2);
insert into public.privileges(id, name)
values (3, 'CARS_LIST');
insert into public.roles_privileges (role_id, privilege_id)
values (1, 3);
insert into public.privileges(id, name)
values (4, 'RESERVATIONS_ADD');
insert into public.roles_privileges (role_id, privilege_id)
values (1, 4);
insert into public.privileges(id, name)
values (5, 'RESERVATIONS_EDIT');
insert into public.roles_privileges (role_id, privilege_id)
values (1, 5);
insert into public.privileges(id, name)
values (6, 'RESERVATIONS_DELETE');
insert into public.roles_privileges (role_id, privilege_id)
values (1, 6);
insert into public.privileges(id, name)
values (7, 'CARS_DELETE');
insert into public.roles_privileges (role_id, privilege_id)
values (1, 7);

-- ADMIN ROLE
insert into public.roles (id, name)
values (2, 'ROLE_ADMIN');

insert into public.privileges(id, name)
values (8, 'CARS_LIST');
insert into public.roles_privileges (role_id, privilege_id)
values (2, 8);
insert into public.privileges(id, name)
values (9, 'RESERVATIONS_ADD');
insert into public.roles_privileges (role_id, privilege_id)
values (2, 9);
insert into public.privileges(id, name)
values (10, 'RESERVATIONS_EDIT');
insert into public.roles_privileges (role_id, privilege_id)
values (2, 10);
insert into public.privileges(id, name)
values (11, 'RESERVATIONS_DELETE');
insert into public.roles_privileges (role_id, privilege_id)
values (2, 11);


insert into public.roles (id, name)
values (3, 'ROLE_ROOT');



insert into public.spot (name, city_id)
VALUES ('MICKIEWICZA', 1),
       ('1 MAJA', 1),
       ('WIEJSKA', 1),
       ('DALEKA', 1),
       ('DERENIOWA', 1),
       ('DŁUGA', 1),
       ('CISOWA', 2),
       ('GALERIA XD', 2),
       ('CICHA', 2),
       ('DOLOMITOWA', 2),
       ('DUŃSKA', 2),
       ('DOLNA', 3),
       ('FABRYCZNA', 3),
       ('GAJOWA', 3),
       ('GARBARSKA', 4),
       ('MACZKA', 4),
       ('BEMA', 4),
       ('GLINIANA', 4),
       ('GÓRNA', 5),
       ('GROCHOWSKA', 5),
       ('GALERIA XD', 6),
       ('CICHA', 6),
       ('DOLOMITOWA', 6),
       ('DUŃSKA', 6),
       ('DOLNA', 3),
       ('GLINIANA', 10),
       ('GÓRNA', 10),
       ('GROCHOWSKA', 10),
       ('JEROZOLIMSKIE', 10),
       ('MARIOT', 10),
       ('DOLOMITOWA', 8),
       ('DUŃSKA', 8),
       ('DOLNA', 8),
       ('DERENIOWA', 7),
       ('DŁUGA', 7),
       ('CISOWA', 7),
       ('FABRYCZNA', 9),
       ('GAJOWA', 9),
       ('GARBARSKA', 9);

INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (110, 'KO 54545', 1, 'Ford', 'Kowal', 5, 1998, 800.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (111, 'WE 12345', 13, 'Renault', 'Weneusz', 2, 1998, 750.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (112, 'KA 88999', 23, 'Chevrolet', 'Kaseusz', 2, 1998, 780.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (113, 'KL 56789', 15, 'Mazda', 'Klimencja', 5, 1998, 850.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (99, 'WV 996580', 14, 'Ford', 'E-Series', 1001, 1990, 120.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (102, 'WV 98896', 10, 'Scion', 'xB', 5, 2018, 6918.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (116, 'WR5630', 9, 'Audi', 'A8', 4, 2019, 870.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (117, 'WA4561', 5, 'Ford', 'Focus', 5, 2017, 870.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (94, 'WX 79879', 5, 'Dodge', 'D350 Club', 2, 1993, 2000.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (119, 'AU 345', 14, 'Audi', 'A9', 4, 2020, 1000.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (115, 'WR E124', 4, 'Audi', 'A8', 5, 2018, 1200.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (95, 'WA 67398', 7, 'Suzuki', 'Esteem', 3, 2006, 7479.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (96, 'WA 68799', 6, 'Volvo', 'S60', 2, 2017, 2392.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (97, 'WV 79699', 22, 'Saturn', 'S-Series', 2, 1999, 2253.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (98, 'WA 89957', 29, 'Volkswagen', 'Jetta', 5, 2013, 301.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (100, 'WC 97998', 31, 'Dodge', 'Durango', 9, 2003, 9811.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (101, 'WL 89787', 31, 'Lamborghini', 'Countach', 4, 2012, 5631.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (103, 'WV 97768', 31, 'Volkswagen', 'Rabbit', 2, 2015, 6299.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (104, 'WX 99899', 31, 'Chevrolet', 'Camaro', 4, 2016, 6549.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (105, 'WL 77988', 31, 'BMW', 'M6', 7, 1997, 1810.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (106, 'WC 99988', 31, 'Mitsubishi', 'Galant', 7, 2006, 1572.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (107, 'WV 99795', 31, 'Mercury', 'Tracer', 4, 2006, 7909.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (108, 'WV 99887', 25, 'Porsche', '911', 7, 2015, 7900.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (109, 'WV 899', 25, 'Nissan', '240SX', 2, 2014, 5600.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (114, 'WL 433', 25, 'Audi', 'A7', 7, 2018, 1000.00, false);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (118, 'WA32', 25, 'Audi', 'A8', 4, 2019, 870.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (120, 'XXX', 5, 'Wolksvagen', 'Golf', 4, 2010, 123.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (75, 'WV 988', 25, 'Volvo', 'C70', 3, 1990, 130.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (85, 'WC ', 25, 'GMC', 'Rally Wagon G3500', 6, 1990, 7860.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (60, 'WV 98999', 32, 'Jaguar', 'XK Series', 8, 2004, 3430.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (61, 'WA 69799', 32, 'Chevrolet', 'Corvette', 8, 2008, 4913.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (62, 'WV 89889', 32, 'Dodge', 'Durango', 6, 2013, 3741.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (63, 'WL 99889', 32, 'Mazda', 'MPV', 4, 1996, 2023.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (64, 'WV 88999', 32, 'Acura', 'Integra', 3, 2014, 2732.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (65, 'WV 98997', 32, 'Cadillac', 'Fleetwood', 2, 2019, 7668.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (66, 'WA 89988', 32, 'Audi', 'V8', 3, 2002, 238.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (67, 'WV 74979', 35, 'MINI', 'Cooper', 9, 1996, 5609.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (68, 'WV 87996', 1, 'Dodge', 'Caliber', 2, 2010, 8865.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (69, 'WA 99799', 4, 'Lincoln', 'Continental Mark VII', 8, 2005, 1979.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (70, 'WC 76787', 17, 'Audi', '5000CS Quattro', 6, 1993, 4812.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (71, 'WV 79969', 17, 'Lincoln', 'Town Car', 2, 1991, 8763.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (72, 'WV 99986', 11, 'Toyota', 'Celica', 2, 2008, 2105.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (73, 'WL 98999', 11, 'GMC', '2500 Club Coupe', 3, 2001, 2177.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (74, 'WA 29698', 11, 'Volkswagen', 'GTI', 7, 1994, 2803.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (76, 'WA 98988', 11, 'Ford', 'Windstar', 4, 2008, 6740.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (77, 'WV 86989', 17, 'Mercedes-Benz', '300E', 7, 1991, 4818.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (78, 'WA 99688', 11, 'Volvo', 'C30', 6, 2012, 8021.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (79, 'WA 89889', 17, 'Volkswagen', 'Passat', 9, 2015, 9056.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (80, 'WA 87978', 17, 'Volkswagen', 'Touareg', 5, 2018, 5277.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (81, 'WA 89889', 17, 'Jeep', 'Grand Cherokee', 7, 2008, 6220.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (82, 'WA 49989', 11, 'Chevrolet', 'Avalanche 2500', 7, 2012, 3445.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (83, 'WA 98999', 17, 'Mazda', 'MPV', 5, 1992, 4487.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (84, 'WA 99879', 11, 'Ford', 'LTD Crown Victoria', 5, 1990, 5229.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (86, 'WV 99889', 11, 'Oldsmobile', '88', 8, 2011, 2058.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (87, 'WV 96779', 16, 'Mitsubishi', 'Precis', 4, 2004, 3443.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (88, 'WV 79985', 17, 'Buick', 'Estate', 9, 2004, 6647.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (89, 'WL 88995', 11, 'Volkswagen', 'Passat', 7, 2002, 5763.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (90, 'WA 99999', 11, 'Dodge', 'Ram Van 3500', 5, 2018, 7975.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (91, 'WV 99889', 17, 'Hyundai', 'Entourage', 4, 2009, 8090.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (92, 'WV 85899', 11, 'Volkswagen', 'Golf', 2, 1992, 1869.00, true);
INSERT INTO public.cars (id, licence, spot_id, make, model, seats, year, price, is_active)
VALUES (93, 'WA 99975', 17, 'Ford', 'F150', 8, 2004, 1151.00, true);


--Add initial address
INSERT INTO public.addresses (id, city, country, house_number, postal_code, street)
VALUES (1001, 'Warszawa', 'PL', '14a', '03-32', 'Stara');

-- Add initial ClientInfos
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (1000, 'booking@mail.com', 'Jan', 'Kowalski', 1001);
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (1001, 'booking2@mail.com', 'Arek', 'Nowak', 1001);
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (1002, 'booking3@mail.com', 'Adrian', 'Jaszczomp', 1001);
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (11111, 'b.pazerny@mail.com', 'Bogdan', 'Pazerny', 1001);
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (11112, 'email@email.com', 'Bogdan', 'Śmigło', 1001);
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (11113, 'fdjksf@mail.ru', 'niekotik', 'kotik', 1001);
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (11114, 'nagini@tom.riddle', 'Stefan', 'Małostkowy', 1001);
INSERT INTO public.client_info (id, email, name, surname, address_id)
VALUES (11115, 'bazyliszek@tom.riddle', 'Bogdan', 'Cyniczny', 1001);


INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (151, 'tyres exchange', '2020-01-31 10:29:41', '2020-02-01 10:29:41', 'UNAVAILABLE', NULL, 99,
        '2020-01-30 10:30:02.311');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (154, 'test', '2020-01-31 15:32:23', '2020-02-01 15:32:23', 'UNAVAILABLE', NULL, 85, '2020-01-30 15:32:31.319');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (133, 'Bookly reservation', '2020-01-30 03:14:16.778', '2020-01-30 23:14:16.778', 'BOOKED', 11113, 94,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (134, 'Bookly reservation', '2020-01-30 23:44:01.189', '2020-02-06 23:44:01.189', 'BOOKED', 11114, 94,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (135, 'Bookly reservation', '2020-02-06 23:54:50.468', '2020-03-17 23:54:50.468', 'BOOKED', 11114, 94,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (136, 'Bookly reservation', '2020-01-31 00:06:08.08', '2020-02-02 00:06:08.08', 'BOOKED', 11114, 100,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (137, 'Bookly reservation', '2020-01-31 00:19:14.66', '2020-02-13 00:19:14.66', 'BOOKED', 11114, 96,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (138, 'Bookly reservation', '2020-01-31 00:20:53.572', '2020-02-06 00:20:53.572', 'BOOKED', 11114, 98,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (139, 'Bookly reservation', '2020-01-31 00:21:48.109', '2020-02-13 00:21:48.109', 'BOOKED', 11114, 103,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (140, 'Bookly reservation', '2020-01-31 00:23:44.197', '2020-02-02 00:23:44.197', 'BOOKED', 11114, 101,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (141, 'Bookly reservation', '2020-02-27 00:28:55.695', '2020-02-28 00:28:55.695', 'BOOKED', 11114, 95,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (142, 'Bookly reservation', '2020-01-31 00:31:15.805', '2020-02-02 00:31:15.805', 'BOOKED', 11114, 112,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (143, 'Bookly reservation', '2020-02-21 00:32:29.973', '2020-03-27 00:32:29.973', 'BOOKED', 11114, 112,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (144, 'Bookly reservation', '2020-02-28 00:34:12.701', '2020-03-06 00:34:12.701', 'BOOKED', 11114, 95,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (145, 'Bookly reservation', '2020-01-30 23:14:16.778', '2020-01-31 23:14:16.778', 'BOOKED', 11113, 111,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (146, 'Bookly reservation', '2020-01-31 00:37:33.205', '2020-02-01 00:37:33.205', 'BOOKED', 11114, 113,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (147, 'Bookly reservation', '2020-02-02 00:39:20.784', '2020-02-04 00:39:20.784', 'BOOKED', 11114, 113,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (148, 'Bookly reservation', '2020-02-20 00:39:40.381', '2020-03-25 00:39:40.381', 'BOOKED', 11114, 113,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (175, 'cleaning', '2020-02-05 16:38:02.574', '2020-02-07 16:38:02', 'UNAVAILABLE', NULL, 119,
        '2020-02-05 16:38:14.487');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (176, 'Bookly reservation', '2020-02-13 22:06:56.988', '2020-02-13 23:06:56.988', 'BOOKED', 11115, 95,
        '2020-02-13 22:11:08.751');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (152, 'Bookly reservation', '2020-02-02 12:11:29.769', '2020-02-04 12:11:29.769', 'BOOKED', 11114, 60,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (156, 'Bookly reservation', '2020-02-02 18:26:41.414', '2020-02-04 18:26:41.414', 'BOOKED', 11114, 66,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (157, 'Bookly reservation', '2020-02-09 01:59:44.557', '2020-02-11 02:11:19.508', 'BOOKED', 11114, 112,
        '2020-02-01 02:20:06.56');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (158, 'Bookly reservation', '2020-02-01 02:21:12.253', '2020-02-01 03:21:12.253', 'BOOKED', 11114, 60,
        '2020-02-01 02:22:17.132');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (159, '', '2020-02-01 07:20:24.08', '2020-02-01 07:20:24.08', 'UNAVAILABLE', NULL, 99,
        '2020-02-01 07:20:35.615');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (160, '', '2020-02-01 07:24:01.873', '2020-02-01 07:24:01.873', 'UNAVAILABLE', NULL, 111,
        '2020-02-01 07:24:09.113');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (161, '', '2020-02-05 07:24:55', '2020-02-13 07:24:55', 'UNAVAILABLE', NULL, 112, '2020-02-01 07:25:12.757');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (163, 'Bookly reservation', '2020-02-01 21:31:22.263', '2020-02-01 22:31:22.263', 'BOOKED', 11114, 104,
        '2020-02-01 21:31:59.626');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (164, 'Bookly reservation', '2020-10-06 23:44:01.189', '2020-10-08 23:44:01.189', 'BOOKED', 11114, 104,
        '2020-02-01 21:57:16.144');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (165, 'Bookly reservation', '2020-11-06 22:44:01.189', '2020-11-08 23:44:01.189', 'BOOKED', 11114, 104,
        '2020-02-01 21:57:45.798');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (166, 'Bookly reservation', '2020-02-03 22:02:05.579', '2020-02-04 22:02:29.54', 'BOOKED', 11114, 100,
        '2020-02-01 22:02:50.399');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (167, 'Bookly reservation', '2020-02-01 22:11:53.415', '2020-02-02 00:13:54.835', 'BOOKED', 11114, 61,
        '2020-02-01 22:13:13.188');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (169, 'Serwis', '2020-02-10 21:56:26', '2020-02-15 21:56:26', 'UNAVAILABLE', NULL, 102,
        '2020-02-02 21:56:43.121');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (149, 'Bookly reservation', '2020-02-12 00:40:21.156', '2020-02-13 00:40:21.156', 'BOOKINGCANCELED', 11114, 102,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (153, 'Bookly reservation', '2020-02-02 12:13:41.021', '2020-02-04 12:13:41.021', 'BOOKINGCANCELED', 11114, 61,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (155, 'Bookly reservation', '2020-02-02 18:25:03.981', '2020-02-04 18:25:03.981', 'BOOKINGCANCELED', 11114, 64,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (150, 'Bookly reservation', '2020-02-02 01:42:36.594', '2020-02-04 01:42:36.594', 'BOOKINGCANCELED', 11114, 109,
        '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (172, 'needs cleaning', '2020-02-06 11:59:57', '2020-02-07 11:59:57', 'UNAVAILABLE', NULL, 118,
        '2020-02-05 12:00:16.984');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (171, 'Bookly reservation', '2020-05-08 10:09:58.724', '2020-05-10 11:15:03.305', 'BOOKINGCANCELED', 11114, 110,
        '2020-02-05 11:14:45.345');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (170, 'Bookly reservation', '2020-02-26 00:09:53.843', '2020-02-27 12:00:50.257', 'BOOKINGCANCELED', 11114, 110,
        '2020-02-05 11:13:09.931');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (168, 'Bookly reservation', '2020-02-01 22:16:19.038', '2020-02-01 23:16:19.038', 'BOOKINGCANCELED', 11114, 60,
        '2020-02-01 22:16:57.223');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (173, 'Bookly reservation', '2020-02-05 12:45:19.933', '2020-02-05 13:45:19.933', 'BOOKED', 11115, 113,
        '2020-02-05 12:46:29.738');
INSERT INTO public.status (id, comment, date_from, date_to, type, client_info_id, car_id, created_at)
VALUES (174, 'Bookly reservation', '2020-02-05 13:24:57.03', '2020-02-05 14:24:57.03', 'BOOKED', 11115, 95,
        '2020-02-05 13:27:46.193');


select setval('roles_id_seq', (SELECT MAX(id) from public.roles));
select setval('cities_id_seq', (SELECT MAX(id) from public.cities));
select setval('spot_id_seq', (SELECT MAX(id) from public.spot));
select setval('addresses_id_seq', (SELECT MAX(id) from public.addresses));
select setval('spot_id_seq', (SELECT MAX(id) from public.spot));
select setval('cars_id_seq', (SELECT MAX(id) from public.cars));
select setval('client_info_id_seq', (SELECT MAX(id) from public.client_info));
select setval('privileges_id_seq', (SELECT MAX(id) from public.privileges));
select setval('status_id_seq', (SELECT MAX(id) from public.status));
select setval('users_id_seq', (SELECT MAX(id) from public.users));