
--Add initial admins
INSERT INTO public.admins(
    id, email, password)
VALUES (1001,'email@email','plain-text-password');

INSERT INTO public.admins(
    id, email, password)
VALUES (1002,'email2@email','plain-text-password');

INSERT INTO public.admins(
    id,email, password)
VALUES (1003,'email3@email','plain-text-password');

INSERT INTO public.admins(
    id,email, password)
VALUES (1004,'email4@email','plain-text-password');



INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (110, 'KO 54545', 'Legionowo', 'Ford', 'Kowal', 5, 1998, 800.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (111, 'WE 12345', 'Konstancin-Jeziorna', 'Renault', 'Weneusz', 2, 1998, 750.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (112, 'KA 88999', 'Zamość', 'Chevrolet', 'Kaseusz', 2, 1998, 780.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (113, 'KL 56789', 'Warszawa', 'Mazda', 'Klimencja', 5, 1998, 850.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (99, 'WV 996580', 'Poznań', 'Ford', 'E-Series', 1001, 1990, 120.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (102, 'WV 98896', 'Łódź', 'Scion', 'xB', 5, 2018, 6918.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (116, 'WR5630', 'Warsaw', 'Audi', 'A8', 4, 2019, 870.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (117, 'WA4561', 'Warsaw', 'Ford', 'Focus', 5, 2017, 870.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (94, 'WX 79879', 'Warszawa', 'Dodge', 'D350 Club', 2, 1993, 2000.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (119, 'AU 345', 'Warszawa', 'Audi', 'A9', 4, 2020, 1000.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (115, 'WR E124', 'Augustów', 'Audi', 'A8', 5, 2018, 1200.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (95, 'WA 67398', 'Warszawa', 'Suzuki', 'Esteem', 3, 2006, 7479.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (96, 'WA 68799', 'Warszawa', 'Volvo', 'S60', 2, 2017, 2392.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (97, 'WV 79699', 'Poznań', 'Saturn', 'S-Series', 2, 1999, 2253.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (98, 'WA 89957', 'Poznań', 'Volkswagen', 'Jetta', 5, 2013, 301.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (100, 'WC 97998', 'Kraków', 'Dodge', 'Durango', 9, 2003, 9811.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (101, 'WL 89787', 'Poznań', 'Lamborghini', 'Countach', 4, 2012, 5631.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (103, 'WV 97768', 'Łódź', 'Volkswagen', 'Rabbit', 2, 2015, 6299.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (104, 'WX 99899', 'Poznań', 'Chevrolet', 'Camaro', 4, 2016, 6549.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (105, 'WL 77988', 'Kraków', 'BMW', 'M6', 7, 1997, 1810.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (106, 'WC 99988', 'Łódź', 'Mitsubishi', 'Galant', 7, 2006, 1572.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (107, 'WV 99795', 'Łódź', 'Mercury', 'Tracer', 4, 2006, 7909.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (108, 'WV 99887', 'Warszawa', 'Porsche', '911', 7, 2015, 7900.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (109, 'WV 89979', 'Kraków', 'Nissan', '240SX', 2, 2014, 5600.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (114, 'WL 4333', 'Augustów', 'Audi', 'A7', 7, 2018, 1000.00, false);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (118, 'WA3240', 'Gdańsk', 'Audi', 'A8', 4, 2019, 870.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (120, 'XXX', 'Skarżysko-Kamienna', 'Wolksvagen', 'Golf', 4, 2010, 123.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (75, 'WV 98899', 'Poznań', 'Volvo', 'C70', 3, 1990, 130.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (85, 'WC 9899', 'Łódź', 'GMC', 'Rally Wagon G3500', 6, 1990, 7860.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (60, 'WV 98999', 'Kraków', 'Jaguar', 'XK Series', 8, 2004, 3430.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (61, 'WA 69799', 'Poznań', 'Chevrolet', 'Corvette', 8, 2008, 4913.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (62, 'WV 89889', 'Poznań', 'Dodge', 'Durango', 6, 2013, 3741.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (63, 'WL 99889', 'Poznań', 'Mazda', 'MPV', 4, 1996, 2023.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (64, 'WV 88999', 'Warszawa', 'Acura', 'Integra', 3, 2014, 2732.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (65, 'WV 98997', 'Poznań', 'Cadillac', 'Fleetwood', 2, 2019, 7668.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (66, 'WA 89988', 'Kraków', 'Audi', 'V8', 3, 2002, 238.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (67, 'WV 74979', 'Łódź', 'MINI', 'Cooper', 9, 1996, 5609.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (68, 'WV 87996', 'Poznań', 'Dodge', 'Caliber', 2, 2010, 8865.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (69, 'WA 99799', 'Poznań', 'Lincoln', 'Continental Mark VII', 8, 2005, 1979.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (70, 'WC 76787', 'Warszawa', 'Audi', '5000CS Quattro', 6, 1993, 4812.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (71, 'WV 79969', 'Warszawa', 'Lincoln', 'Town Car', 2, 1991, 8763.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (72, 'WV 99986', 'Poznań', 'Toyota', 'Celica', 2, 2008, 2105.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (73, 'WL 98999', 'Kraków', 'GMC', '2500 Club Coupe', 3, 2001, 2177.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (74, 'WA 29698', 'Łódź', 'Volkswagen', 'GTI', 7, 1994, 2803.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (76, 'WA 98988', 'Poznań', 'Ford', 'Windstar', 4, 2008, 6740.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (77, 'WV 86989', 'Warszawa', 'Mercedes-Benz', '300E', 7, 1991, 4818.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (78, 'WA 99688', 'Łódź', 'Volvo', 'C30', 6, 2012, 8021.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (79, 'WA 89889', 'Warszawa', 'Volkswagen', 'Passat', 9, 2015, 9056.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (80, 'WA 87978', 'Warszawa', 'Volkswagen', 'Touareg', 5, 2018, 5277.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (81, 'WA 89889', 'Warszawa', 'Jeep', 'Grand Cherokee', 7, 2008, 6220.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (82, 'WA 49989', 'Kraków', 'Chevrolet', 'Avalanche 2500', 7, 2012, 3445.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (83, 'WA 98999', 'Warszawa', 'Mazda', 'MPV', 5, 1992, 4487.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (84, 'WA 99879', 'Poznań', 'Ford', 'LTD Crown Victoria', 5, 1990, 5229.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (86, 'WV 99889', 'Kraków', 'Oldsmobile', '88', 8, 2011, 2058.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (87, 'WV 96779', 'Łódź', 'Mitsubishi', 'Precis', 4, 2004, 3443.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (88, 'WV 79985', 'Warszawa', 'Buick', 'Estate', 9, 2004, 6647.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (89, 'WL 88995', 'Poznań', 'Volkswagen', 'Passat', 7, 2002, 5763.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (90, 'WA 99999', 'Łódź', 'Dodge', 'Ram Van 3500', 5, 2018, 7975.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (91, 'WV 99889', 'Warszawa', 'Hyundai', 'Entourage', 4, 2009, 8090.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (92, 'WV 85899', 'Kraków', 'Volkswagen', 'Golf', 2, 1992, 1869.00, true);
INSERT INTO public.cars (id, licence, location, make, model, seats, year, price, is_active) VALUES (93, 'WA 99975', 'Warszawa', 'Ford', 'F150', 8, 2004, 1151.00, true);


-- Add initial BookingUserInfos
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (1000, 'booking@mail.com', 'Jan', 'Kowalski');
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (1001, 'booking2@mail.com', 'Arek', 'Nowak');
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (1002, 'booking3@mail.com', 'Adrian', 'Jaszczomp');
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (1, 'b.pazerny@mail.com', 'Bogdan', 'Pazerny');
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (2, 'email@email.com', 'Bogdan', 'Śmigło');
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (3, 'fdjksf@mail.ru', 'niekotik', 'kotik');
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (4, 'nagini@tom.riddle', 'Stefan', 'Małostkowy');
INSERT INTO public.booking_user_infos (id, email, name, surname) VALUES (5, 'bazyliszek@tom.riddle', 'Bogdan', 'Cyniczny');


INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (151, 'tyres exchange', '2020-01-31 10:29:41', '2020-02-01 10:29:41', 'UNAVAILABLE', NULL, 99, '2020-01-30 10:30:02.311');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (154, 'test', '2020-01-31 15:32:23', '2020-02-01 15:32:23', 'UNAVAILABLE', NULL, 85, '2020-01-30 15:32:31.319');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (133, 'Bookly reservation', '2020-01-30 03:14:16.778', '2020-01-30 23:14:16.778', 'BOOKED', 3, 94, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (134, 'Bookly reservation', '2020-01-30 23:44:01.189', '2020-02-06 23:44:01.189', 'BOOKED', 4, 94, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (135, 'Bookly reservation', '2020-02-06 23:54:50.468', '2020-03-17 23:54:50.468', 'BOOKED', 4, 94, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (136, 'Bookly reservation', '2020-01-31 00:06:08.08', '2020-02-02 00:06:08.08', 'BOOKED', 4, 100, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (137, 'Bookly reservation', '2020-01-31 00:19:14.66', '2020-02-13 00:19:14.66', 'BOOKED', 4, 96, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (138, 'Bookly reservation', '2020-01-31 00:20:53.572', '2020-02-06 00:20:53.572', 'BOOKED', 4, 98, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (139, 'Bookly reservation', '2020-01-31 00:21:48.109', '2020-02-13 00:21:48.109', 'BOOKED', 4, 103, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (140, 'Bookly reservation', '2020-01-31 00:23:44.197', '2020-02-02 00:23:44.197', 'BOOKED', 4, 101, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (141, 'Bookly reservation', '2020-02-27 00:28:55.695', '2020-02-28 00:28:55.695', 'BOOKED', 4, 95, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (142, 'Bookly reservation', '2020-01-31 00:31:15.805', '2020-02-02 00:31:15.805', 'BOOKED', 4, 112, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (143, 'Bookly reservation', '2020-02-21 00:32:29.973', '2020-03-27 00:32:29.973', 'BOOKED', 4, 112, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (144, 'Bookly reservation', '2020-02-28 00:34:12.701', '2020-03-06 00:34:12.701', 'BOOKED', 4, 95, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (145, 'Bookly reservation', '2020-01-30 23:14:16.778', '2020-01-31 23:14:16.778', 'BOOKED', 3, 111, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (146, 'Bookly reservation', '2020-01-31 00:37:33.205', '2020-02-01 00:37:33.205', 'BOOKED', 4, 113, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (147, 'Bookly reservation', '2020-02-02 00:39:20.784', '2020-02-04 00:39:20.784', 'BOOKED', 4, 113, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (148, 'Bookly reservation', '2020-02-20 00:39:40.381', '2020-03-25 00:39:40.381', 'BOOKED', 4, 113, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (175, 'cleaning', '2020-02-05 16:38:02.574', '2020-02-07 16:38:02', 'UNAVAILABLE', NULL, 119, '2020-02-05 16:38:14.487');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (176, 'Bookly reservation', '2020-02-13 22:06:56.988', '2020-02-13 23:06:56.988', 'BOOKED', 5, 95, '2020-02-13 22:11:08.751');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (152, 'Bookly reservation', '2020-02-02 12:11:29.769', '2020-02-04 12:11:29.769', 'BOOKED', 4, 60, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (156, 'Bookly reservation', '2020-02-02 18:26:41.414', '2020-02-04 18:26:41.414', 'BOOKED', 4, 66, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (157, 'Bookly reservation', '2020-02-09 01:59:44.557', '2020-02-11 02:11:19.508', 'BOOKED', 4, 112, '2020-02-01 02:20:06.56');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (158, 'Bookly reservation', '2020-02-01 02:21:12.253', '2020-02-01 03:21:12.253', 'BOOKED', 4, 60, '2020-02-01 02:22:17.132');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (159, '', '2020-02-01 07:20:24.08', '2020-02-01 07:20:24.08', 'UNAVAILABLE', NULL, 99, '2020-02-01 07:20:35.615');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (160, '', '2020-02-01 07:24:01.873', '2020-02-01 07:24:01.873', 'UNAVAILABLE', NULL, 111, '2020-02-01 07:24:09.113');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (161, '', '2020-02-05 07:24:55', '2020-02-13 07:24:55', 'UNAVAILABLE', NULL, 112, '2020-02-01 07:25:12.757');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (163, 'Bookly reservation', '2020-02-01 21:31:22.263', '2020-02-01 22:31:22.263', 'BOOKED', 4, 104, '2020-02-01 21:31:59.626');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (164, 'Bookly reservation', '2020-10-06 23:44:01.189', '2020-10-08 23:44:01.189', 'BOOKED', 4, 104, '2020-02-01 21:57:16.144');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (165, 'Bookly reservation', '2020-11-06 22:44:01.189', '2020-11-08 23:44:01.189', 'BOOKED', 4, 104, '2020-02-01 21:57:45.798');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (166, 'Bookly reservation', '2020-02-03 22:02:05.579', '2020-02-04 22:02:29.54', 'BOOKED', 4, 100, '2020-02-01 22:02:50.399');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (167, 'Bookly reservation', '2020-02-01 22:11:53.415', '2020-02-02 00:13:54.835', 'BOOKED', 4, 61, '2020-02-01 22:13:13.188');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (169, 'Serwis', '2020-02-10 21:56:26', '2020-02-15 21:56:26', 'UNAVAILABLE', NULL, 102, '2020-02-02 21:56:43.121');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (149, 'Bookly reservation', '2020-02-12 00:40:21.156', '2020-02-13 00:40:21.156', 'BOOKINGCANCELED', 4, 102, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (153, 'Bookly reservation', '2020-02-02 12:13:41.021', '2020-02-04 12:13:41.021', 'BOOKINGCANCELED', 4, 61, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (155, 'Bookly reservation', '2020-02-02 18:25:03.981', '2020-02-04 18:25:03.981', 'BOOKINGCANCELED', 4, 64, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (150, 'Bookly reservation', '2020-02-02 01:42:36.594', '2020-02-04 01:42:36.594', 'BOOKINGCANCELED', 4, 109, '2019-01-31 14:48:00');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (172, 'needs cleaning', '2020-02-06 11:59:57', '2020-02-07 11:59:57', 'UNAVAILABLE', NULL, 118, '2020-02-05 12:00:16.984');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (171, 'Bookly reservation', '2020-05-08 10:09:58.724', '2020-05-10 11:15:03.305', 'BOOKINGCANCELED', 4, 110, '2020-02-05 11:14:45.345');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (170, 'Bookly reservation', '2020-02-26 00:09:53.843', '2020-02-27 12:00:50.257', 'BOOKINGCANCELED', 4, 110, '2020-02-05 11:13:09.931');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (168, 'Bookly reservation', '2020-02-01 22:16:19.038', '2020-02-01 23:16:19.038', 'BOOKINGCANCELED', 4, 60, '2020-02-01 22:16:57.223');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (173, 'Bookly reservation', '2020-02-05 12:45:19.933', '2020-02-05 13:45:19.933', 'BOOKED', 5, 113, '2020-02-05 12:46:29.738');
INSERT INTO public.status (id, comment, date_from, date_to, type, booking_user_info_id, car_id, created_at) VALUES (174, 'Bookly reservation', '2020-02-05 13:24:57.03', '2020-02-05 14:24:57.03', 'BOOKED', 5, 95, '2020-02-05 13:27:46.193');


insert into public.cities (id,name) VALUES
(1,'KATOWICE'),
(2,'LUBLIN'),
(3,'BYDGOSZCZ'),
(4,'SZCZECIN'),
(5,'GDAŃSK'),
(6,'POZNAŃ'),
(7,'WROCŁAW'),
(8,'ŁÓDŹ'),
(9,'KRAKÓW'),
(10,'WARSZAWA');

insert into public.spot ( name, city_id)  VALUES
('MICKIEWICZA',1),
('1 MAJA',1),
('WIEJSKA',1),
('DALEKA',1),
('DERENIOWA',1),
('DŁUGA',1),
('CISOWA',2),
('GALERIA XD',2),
('CICHA',2),
('DOLOMITOWA',2),
('DUŃSKA',2),
('DOLNA',3),
('FABRYCZNA',3),
('GAJOWA',3),
('GARBARSKA',4),
('MACZKA',4),
('BEMA',4),
('GLINIANA',4),
('GÓRNA',5),
('GROCHOWSKA',5),
('GALERIA XD',6),
('CICHA',6),
('DOLOMITOWA',6),
('DUŃSKA',6),
('DOLNA',3),
('GLINIANA',10),
('GÓRNA',10),
('GROCHOWSKA',10),
('JEROZOLIMSKIE',10),
('MARIOT',10),
('DOLOMITOWA',8),
('DUŃSKA',8),
('DOLNA',8),
('DERENIOWA',7),
('DŁUGA',7),
('CISOWA',7),
('FABRYCZNA',9),
('GAJOWA',9),
('GARBARSKA',9);