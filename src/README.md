This sends it to a database file /queries.db which is just a simple JSON Database.

Commands interface like an API, so going to the link below will send a query to the server:

localhost:8080/?action=generate&top_artists=2&artists_per_artist=3&songs_per_generated_artist=3

Data stored in database as JSON:

{"_id":1,"top_artists":"2","artists_per_artist":"3","songs_per_generated_artist":"3","date":"25/2/2019"}

{"_id":2,"top_artists":"1","artists_per_artist":"3","songs_per_generated_artist":"5","date":"25/2/2019"}
