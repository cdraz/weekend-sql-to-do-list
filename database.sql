-- localhost
-- Port 5432
-- db name: to_do_app

CREATE TABLE "tasks"
    (
        "id" SERIAL PRIMARY KEY,
        "description" VARCHAR(250) NOT NULL,
        "complete" BOOLEAN NOT NULL,
        "time_completed" VARCHAR(50)
    );

INSERT INTO "tasks"
    ("description", "complete")
VALUES
    ('Take out the trash', false),
    ('Change Dewey''s litter box', false),
    ('Meal prep lunch for the week', false),
    ('Complete the weekend challenge', false),
    ('Sign up for a local tech meetup', false);