CREATE TABLE SEAT_TYPE (
	seat_type_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	price DECIMAL NOT NULL,
	type VARCHAR(255) NOT NULL
);

CREATE TABLE USER (
	user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	gender VARCHAR(255) NOT NULL,
	isAdmin BOOLEAN NOT NULL DEFAULT 0,
	street VARCHAR(255) NOT NULL,
	street_no VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	region VARCHAR(255),
	zip_code VARCHAR(255) NOT NULL,
	country VARCHAR(255) NOT NULL
);

CREATE TABLE RESERVATION (
	res_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	price DECIMAL NOT NULL,
	res_date TIMESTAMP NOT NULL,
	adults_no INTEGER NOT NULL,
	minors_no INTEGER NOT NULL,
	passengers_no INTEGER NOT NULL,
	one_way BOOLEAN NOT NULL,
	user_id INTEGER NOT NULL,
	FOREIGN KEY(user_id) REFERENCES USER(user_id) 
);

CREATE TABLE TICKET (
	ticket_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	res_id INTEGER NOT NULL,
	FOREIGN KEY(res_id) REFERENCES RESERVATION(res_id)
);

CREATE TABLE SEAT (
	seat_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	occupied BOOLEAN NOT NULL,
	code VARCHAR(255) NOT NULL
);

CREATE TABLE FLIGHT (
	flight_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	depart_airport VARCHAR(255) NOT NULL,
	depart_date DATE NOT NULL,
	depart_time TIME NOT NULL,
	arrival_time TIME NOT NULL,
	arrival_date DATE NOT NULL,
	dest_airport VARCHAR(255) NOT NULL,
	airline VARCHAR(255) NOT NULL
);

CREATE TABLE Seat_Has_SeatType (
	seat_id INTEGER NOT NULL,
	seat_type_id INTEGER NOT NULL,
	PRIMARY KEY (seat_id, seat_type_id), 
	FOREIGN KEY(seat_id) REFERENCES SEAT(seat_id),
	FOREIGN KEY(seat_type_id) REFERENCES SEAT_TYPE(seat_type_id)
);

CREATE TABLE Ticket_Has_FlightSeat (
	seat_id INTEGER NOT NULL,
	ticket_id INTEGER NOT NULL,
	flight_id INTEGER NOT NULL,
	PRIMARY KEY (seat_id, ticket_id, flight_id)
	FOREIGN KEY(seat_id) REFERENCES SEAT(seat_id),
	FOREIGN KEY(ticket_id) REFERENCES TICKET(ticket_id),
	FOREIGN KEY(flight_id) REFERENCES FLIGHT(flight_id)
);

















