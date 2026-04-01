import React, { useActionState, useState } from "react";
import axios from 'axios';
import '../components/AddGigForm.css'; 
import { useRef } from "react";

const AddGigForm = ({ onGigAdded }) => {
    const [newGig, setNewGig] = useState({
        artist: '',
        event: '',
        description: '',
        day: '',
        beginning: '',
        address: '',
        city: '',
        ticket_purchase: '',
        genre: ''
    });

    const [socialLinks, setSocialLinks] = useState([]);
    const [posterFile, setPosterFile] = useState(null);

    const fileInputRef = useRef(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGig({ ...newGig, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
    
            // FormData tarvitaan tiedoston lataukseen
            const formData = new FormData();
    
            // Lisää tekstikentät
            Object.keys(newGig).forEach(key => {
                formData.append(key, newGig[key]);
            });
    
            // Lisää kuva
            if (posterFile) {
                formData.append("poster", posterFile);
            }

            formData.append( 
                "artist_social_media", 
                JSON.stringify( 
                    socialLinks.reduce((acc, link) => { 
                        if (link.type && link.url) acc[link.type] = link.url; return acc; 
                    }, {})
                ) 
            );
    
            await axios.post("http://localhost:3001/gigs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
    
            onGigAdded();
            setSuccessMessage("Keikka lisättiin onnistuneesti!");
            setErrorMessage("");
    
            // Tyhjennä lomake
            setNewGig({
                artist: '',
                event: '',
                description: '',
                day: '',
                beginning: '',
                address: '',
                city: '',
                ticket_purchase: '',
                genre: '',
                artist_social_media: ''
            });
            setPosterFile(null);
    
        } catch (error) {
            console.error("Error while adding gig:", error);
            setErrorMessage("Virhe keikan lisäämisessä: " + (error.response?.data?.error || error.message));
            setSuccessMessage("");
        }
    };    

    return (
        <form onSubmit={handleSubmit} className="add-gig-form">
            <h2>Lisää uusi keikka</h2>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <input name="artist" value={newGig.artist} onChange={handleChange} placeholder="Artisti"/>
            <input name="event" value={newGig.event} onChange={handleChange} placeholder="Tapahtuma"/>
            <input name="description" value={newGig.description} onChange={handleChange} placeholder="Kuvaus"/>

            <input type="date" name="day" value={newGig.day} onChange={handleChange} placeholder="Päivämäärä"/>
            <input type="time" name="beginning" value={newGig.beginning} onChange={handleChange} placeholder="Aloitusaika"/>

            <input name="address" value={newGig.address} onChange={handleChange} placeholder="Osoite"/>
            <input name="city" value={newGig.city} onChange={handleChange} placeholder="Kaupunki"/>
            <input name="ticket_purchase" value={newGig.ticket_purchase} onChange={handleChange} placeholder="Lippulinkki"/>
            <input name="genre" value={newGig.genre} onChange={handleChange} placeholder="Genre"/>
            
            <input
                type="file"
                name="poster"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setPosterFile(e.target.files[0])}
            />

            {posterFile && (
                <div className="file-preview">
                    <span>{posterFile.name}</span>
                    <button
                        type="button"
                        className="remove-btn"
                        onClick={() => {
                            setPosterFile(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";   
                            }
                        }}
                    >
                        Poista kuva
                    </button>
                </div>
            )}

            <button type="button" onClick={() => setSocialLinks([...socialLinks, { type: "", url: "" }])}>
                Lisää some-linkki
            </button>

            {socialLinks.map((link, index) => (
                <div key={index} className="social-link-row">
                    <select
                    value={link.type}
                    onChange={(e) => {
                        const updated = [...socialLinks];
                        updated[index].type = e.target.value;
                        setSocialLinks(updated);
                    }}
                    >
                    <option value="">Valitse some</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="website">Kotisivu</option>
                    </select>

                    <input
                    type="text"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => {
                        const updated = [...socialLinks];
                        updated[index].url = e.target.value;
                        setSocialLinks(updated);
                    }}
                    />

                    <button
                        type="button"
                        className="remove-btn"
                        onClick={() => {
                            const updated = socialLinks.filter((_, i) => i !== index);
                            setSocialLinks(updated);
                        }}
                        >
                        ✕
                    </button>
                </div>
            ))}


            <button type="submit">Tallenna keikka</button>
        </form>
    );
};

export default AddGigForm;