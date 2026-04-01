exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gigs').del()
    .then(function () {
      // Inserts seed entries
      return knex('gigs').insert([
        { 
          gig_id: 1,
          // user_id: 1,
          artist: "Skillet",
          event: "Rhythm Reborn",
          poster: "img",
          description: "Skillet is an American Christian rock band known for its powerful blend of hard rock, symphonic, and electronic elements. Formed in 1996, they’ve gained success with albums like Comatose and Awake, and are celebrated for their intense live performances. The band explores themes of faith and personal struggle, with a dedicated fanbase and multiple awards to their name.",
          day: "2025-04-14",
          beginning: "16:00",
          address: "81-800 Avenue 51, Indio",
          city: "California",
          ticket_purchase: "URL",
          genre: "Rock",
          artist_social_media: JSON.stringify({
            facebook: "https://www.facebook.com/skillet/",
            instagarm: "https://www.instagram.com/skilletmusic/",
            youtube: "https://www.youtube.com/skilletband/videos"
          })
        },
        {
          gig_id: 2,
          // user_id: 2,
          artist: "Ariana Grande",
          event: "Harmony Horizon",
          poster: "img",
          description: "Ariana Grande is an American singer, songwriter, and actress known for her powerful voice and wide vocal range. She first gained fame as an actress on Victorious and later became a successful pop artist with hit albums like Yours Truly and Dangerous Woman.",
          day: "2025-04-15",
          beginning: "14:00",
          address: "De Schorre, 2850 Boom",
          city: "Boom",
          ticket_purchase: "URL",
          genre: "Pop",
          artist_social_media: JSON.stringify({
            facebook: "https://facebook.com/arianagrande",
            instagram: "https://instagram.com/arianagrande",
            youtube: "https://youtube.com/arianagrande"
          })
        },
        {
          gig_id: 3,
          // user_id: 3,
          artist: "David Guetta",
          event: "The Beat Goes On",
          poster: "img",
          description: "David Guetta is a French DJ and music producer, known for his groundbreaking contributions to the electronic dance music (EDM) scene. He gained international fame with hits like Titanium and When Love Takes Over, collaborating with artists such as Rihanna and Usher. With numerous awards and a global fanbase, Guetta remains one of the most influential figures in modern EDM.",
          day: "2025-04-16",
          beginning: "12:00",
          address: "Av. Salvador Allende, 6555 - Barra da Tijuca",
          city: "Rio de Janeiro",
          ticket_purchase: "URL",
          genre: "EDM",
          artist_social_media: JSON.stringify({
            facebook: "https://facebook.com/davidguetta",
            instagram: "https://instagram.com/davidguetta",
            youtube: "https://youtube.com/davidguetta"
          })
        },
      ]);
    });
};