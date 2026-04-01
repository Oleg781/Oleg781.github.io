const db = require('../db');

const getGigs = async (req, res) => {
    try {
        const gigs = await db('gigs');
        res.json(gigs); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addGig = async (req, res) => {
    const { artist, event, description, day, beginning, address, city, ticket_purchase, genre, artist_social_media } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    if (!artist || !event || !description || !day || !beginning || !address || !city || !ticket_purchase || !genre || !artist_social_media) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try { 
        const [id] = await db('gigs').insert({
            artist,
            event,
            description,
            day,
            beginning,
            address,
            city,
            ticket_purchase,
            genre,
            artist_social_media,
            img: imagePath || null
        });

        res.status(201).json({ id, imagePath });
    } catch (error) {
        console.error('Error adding gig', error);
        res.status(500).json({ error: 'Failed to add gig' });
    }
};

module.exports = { getGigs, addGig };
