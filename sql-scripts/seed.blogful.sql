BEGIN; 

INSERT INTO blogful_articles(title, date_published, content) 
VALUES
('title 1', now() - '7 days'::INTERVAL, 'content 1'),
('title 2', now() - '7 days'::INTERVAL, 'content 1'),
('title 3', now() - '5 days'::INTERVAL, 'content 2'),
('title 4', now() - '5 days'::INTERVAL, 'content 2'),
('title 5', now() - '4 days'::INTERVAL, 'content 3'),
('title 6', now() - '4 days'::INTERVAL, 'content 3'),
('title 7', now() - '8 days'::INTERVAL, 'content 3'),
('title 8', now() - '9 days'::INTERVAL, 'content 4'),
('title 9', now() - '5 days'::INTERVAL, 'content 5'),
('title 10', now() - '4 days'::INTERVAL, 'content 5')
; 

COMMIT; 
