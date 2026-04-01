import React, { useState, useEffect } from "react";
import GigList from "./GigList";
import './GigView.css';

function GigView({ gigs, showPast, toggleView }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [filteredGigs, setFilteredGigs] = useState([]);

    useEffect(() => {
        const currentDate = new Date();

        const newFiltered = gigs.filter((gig) => {
            const gigDate = new Date(gig.day);

            const matchCity = selectedCity ? gig.city === selectedCity : true;
            const matchMonth = selectedMonth ? gigDate.getMonth() + 1 === parseInt(selectedMonth) : true;
            const matchGenre = selectedGenre ? gig.genre === selectedGenre : true;
            const matchTime = showPast ? gigDate < currentDate : gigDate >= currentDate;

            return matchCity && matchMonth && matchGenre && matchTime;
        });

        setFilteredGigs(newFiltered);
    }, [gigs, selectedCity, selectedMonth, selectedGenre, showPast]);

    return (
        <>
            <div className="gig-view">
                <div className="filters">
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                        <option value="">📍Paikkakunta</option>
                        <option value="Boom">Boom</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="California">California</option>
                    </select>

                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value="">📅Kuukausi</option>
                        <option value="01">Tammikuu</option>
                        <option value="02">Helmikuu</option>
                        <option value="03">Maaliskuu</option>
                        <option value="04">Huhtikuu</option>
                        <option value="05">Toukokuu</option>
                        <option value="06">Kesäkuu</option>
                        <option value="07">Heinäkuu</option>
                        <option value="08">Elokuu</option>
                        <option value="09">Syyskuu</option>
                        <option value="10">Lokakuu</option>
                        <option value="11">Marraskuu</option>
                        <option value="12">Joulukuu</option>
                    </select>

                    <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                        <option value="">🎵Genre</option>
                        <option value="Rock">Rock</option>
                        <option value="EDM">EDM</option>
                        <option value="Pop">Pop</option>
                    </select>

                    <button className="toggle-show-gigs" onClick={toggleView}>
                        {showPast ? "Näytä tulevat keikat" : "Näytä menneet keikat"}
                    </button>
                </div>
                <GigList gigs={filteredGigs} showPast={showPast} toggleView={toggleView}/>
            </div>
        </>
    );
}

export default GigView;
