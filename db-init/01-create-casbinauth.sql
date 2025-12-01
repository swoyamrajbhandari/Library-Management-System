
CREATE SCHEMA IF NOT EXISTS casbinauth;

SET search_path TO casbinauth;

-- CREATE TABLE IF NOT EXISTS casbin_rule (
--     id SERIAL PRIMARY KEY,
--     ptype VARCHAR(255),
--     v0 VARCHAR(255),
--     v1 VARCHAR(255),
--     v2 VARCHAR(255),
--     v3 VARCHAR(255),
--     v4 VARCHAR(255)
-- );

-- INSERT INTO casbin_rule (ptype, v0, v1, v2, v3, v4) VALUES ('p', 'admin', 'rule.list', 'read', '*', 'allow');
-- INSERT INTO casbin_rule (ptype, v0, v1, v2, v3, v4) VALUES ('p', 'admin', 'rule.info', 'read', '*', 'allow');
-- INSERT INTO casbin_rule (ptype, v0, v1, v2, v3, v4) VALUES ('p', 'admin', 'rule', 'write', '*', 'allow');
-- INSERT INTO casbin_rule (ptype, v0, v1, v2, v3, v4) VALUES ('p', 'admin', 'rule.info', 'update', '*', 'allow');
-- INSERT INTO casbin_rule (ptype, v0, v1, v2, v3, v4) VALUES ('p', 'admin', 'rule', 'delete', '*', 'allow');
