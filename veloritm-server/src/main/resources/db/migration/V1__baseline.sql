-- V1 baseline migration for VeloServer.
--
-- Establishes the Flyway migration history and the database prerequisites shared across modules.
-- Domain tables are introduced by later, module-scoped migrations (V2+: users/auth, catalog, orders, ...).
--
-- pgcrypto provides gen_random_uuid(), used for UUID primary keys throughout the schema.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
