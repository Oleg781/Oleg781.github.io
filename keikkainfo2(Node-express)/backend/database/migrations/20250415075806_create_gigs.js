exports.up = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('gigs')
    .createTable('gigs', t => {
        t.increments('gig_id').primary()
        t.string('artist', 255).notNullable().unique()
        t.string('event', 255).notNullable()
        t.string('poster', 255).notNullable()
        t.text('description', 1000).notNullable()
        t.date('day').notNullable()
        t.time('beginning').notNullable()
        t.string('address', 255).notNullable()
        t.string('city', 255).notNullable()
        t.string('ticket_purchase', 255).notNullable()
        t.string('genre', 255).notNullable()
        t.string('artist_social_media', 255).notNullable()
    })
    // // // .then(() => {
    // // //   return knex('gigs1').insert([
    // // //     {
    // // //     artist: 'Skillet',
    // // //     event: 'Rhythm Reborn',
    // // //     poster: 'img/skillet.jpg',
    // // //     description: 'Skillet is an American Christian rock band known for its powerful blend of hard rock, symphonic, and electronic elements. Formed in 1996.',
    // // //     day: '2025-04-14',
    // // //     beginning: '16:00:00',
    // // //     address: '81-800 Avenue 51, Indio',
    // // //     city: 'California',
    // // //     ticket_purchase: 'https://example.com/tickets/skillet',
    // // //     genre: 'Rock',
    // // //     artist_social_media: 'https://facebook.com/skilletmusic'
    // // //   },
    // // //   {
    // // //     artist: 'Ariana Grande',
    // // //     event: 'Harmony Horizon',
    // // //     poster: 'img/ariana_grande.jpg',
    // // //     description: 'Ariana Grande is an American singer, songwriter, and actress known for her powerful voice and wide vocal range.',
    // // //     day: '2025-04-15',
    // // //     beginning: '14:00:00',
    // // //     address: 'De Schorre, 2850 Boom',
    // // //     city: 'Boom',
    // // //     ticket_purchase: 'https://example.com/tickets/ariana_grande',
    // // //     genre: 'Pop',
    // // //     artist_social_media: 'https://twitter.com/ArianaGrande'
    // // //   },
    // // //   {
    // // //     artist: 'David Guetta',
    // // //     event: 'The Beat Goes On',
    // // //     poster: 'img/david_guetta.jpg',
    // // //     description: 'David Guetta is a French DJ and music producer, known for his groundbreaking contributions to the EDM scene.',
    // // //     day: '2025-04-16',
    // // //     beginning: '12:00:00',
    // // //     address: 'Av. Salvador Allende, 6555 - Barra da Tijuca',
    // // //     city: 'Rio de Janeiro',
    // // //     ticket_purchase: 'https://example.com/tickets/david_guetta',
    // // //     genre: 'EDM',
    // // //     artist_social_media: 'https://instagram.com/davidguetta'
    // // //   }
    // //   ])
    // });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('gigs')
  };