--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    destination TEXT,
    type TEXT,
    code TEXT
);

INSERT INTO Campaigns (name, destination, type, code) values ('test1', 'test1', 'test1', 'test1');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Campaigns
