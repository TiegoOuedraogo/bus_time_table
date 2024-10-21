DROP SCHEMA IF EXISTS bus_timetabling CASCADE;
CREATE SCHEMA bus_timetabling;

SET search_path TO bus_timetabling;

CREATE TABLE IF NOT EXISTS routes (
                                      route_id    BIGSERIAL PRIMARY KEY,
                                      route_name  VARCHAR(255) NOT NULL,
                                      origin      VARCHAR(255) NOT NULL,
                                      destination VARCHAR(255) NOT NULL,
                                      distance    DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS buses (
                                     bus_id   BIGSERIAL PRIMARY KEY,
                                     number   VARCHAR(255) NOT NULL,
                                     capacity INTEGER NOT NULL,
                                     status   SMALLINT NOT NULL,
                                     route_id BIGINT NOT NULL
);


CREATE TABLE IF NOT EXISTS stops (
                                     stop_id   BIGSERIAL PRIMARY KEY,
                                     stop_name VARCHAR(255) NOT NULL,
                                     route_id  BIGINT
);

CREATE TABLE IF NOT EXISTS times_tables (
                                            times_table_id BIGSERIAL PRIMARY KEY,
                                            departures     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                                            arrival        TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                                            bus_id         BIGINT NOT NULL,
                                            stop_id        BIGINT NOT NULL
);

-- DO $$
--     BEGIN
--         IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_bus_on_route') THEN
--             ALTER TABLE buses
--                 ADD CONSTRAINT fk_bus_on_route FOREIGN KEY (route_id) REFERENCES routes (route_id);
--         END IF;
--
--         IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_stop_on_route') THEN
--             ALTER TABLE stops
--                 ADD CONSTRAINT fk_stop_on_route FOREIGN KEY (route_id) REFERENCES routes (route_id);
--         END IF;
--
--         IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_times_table_on_bus') THEN
--             ALTER TABLE times_tables
--                 ADD CONSTRAINT fk_times_table_on_bus FOREIGN KEY (bus_id) REFERENCES buses (bus_id);
--         END IF;
--
--         IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_times_table_on_stop') THEN
--             ALTER TABLE times_tables
--                 ADD CONSTRAINT fk_times_table_on_stop FOREIGN KEY (stop_id) REFERENCES stops (stop_id);
--         END IF;
--     END $$;