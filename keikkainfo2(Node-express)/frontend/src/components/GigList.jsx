import React from "react";
import './GigList.css';

function GigList({ gigs, showPast, toggleView }) {
    const currentDate = new Date();    

    const filteredGigs = gigs.filter(gig => {
        const gigDate = new Date(gig.day);
        return showPast ? gigDate < currentDate : gigDate >= currentDate;
    });

    let socialMedia = {};

    try {
        socialMedia = JSON.parse(gig.artist_social_media || "{}");
    } catch {
        socialMedia = {};
    }

    return (
        <div className="gigs-container">    
            <div className="gigs-list">
                {filteredGigs.length === 0 ? (
                    <p>Ei keikkoja löytynyt</p>
                ) : (
                    filteredGigs.map((gig, index) => {
                        const gigKey = gig.id || `${gig.artist}-${gig.event}-${gig.day}-${index}`;

                        let socialMedia = {};

                        try {
                            socialMedia = JSON.parse(gig.artist_social_media || "{}");
                        } catch {
                            socialMedia = {};
                        }                        

                        return (
                            <div key={gigKey} className="gig-card">
                            <div className="gig-image">
                                {gig.img && (
                                    <img src={`http://localhost:3001${gig.img}`} alt={gig.event} />
                                )}
                            </div>
                        
                            <div className="gig-info">
                                <h2>{gig.artist} – {gig.event}</h2>
                        
                                <p className="gig-description">{gig.description}</p>
                        
                                <p><strong>Paikka:</strong> {gig.city}</p>
                                <p><strong>Osoite:</strong> {gig.address}</p>
                                <p><strong>Aika:</strong> {gig.day}, {gig.beginning}</p>
                        
                                <div className="gig-social">
                                    <p><strong>Some:</strong></p>
                                    {Object.entries(socialMedia).map(([key, url]) => (
                                        <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                                            {key}
                                        </a>
                                    ))}
                                </div>
                        
                                <a className="ticket-button" href={gig.ticket_purchase} target="_blank" rel="noopener noreferrer">
                                    Osta liput
                                </a>
                            </div>
                            </div>                        
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default GigList;
