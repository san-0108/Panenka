//fixturehome.jsx
import React from 'react'
import './fixturehome.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { useMemo } from 'react';
export const FixtureHome = () => {

  const [fixturesData, setFixturesData] = useState(null);

  const fetchdata = useMemo(() => async () => {
    

      const apiUrl = 'https://v3.football.api-sports.io/fixtures?season=2023&league=39&next=4';
    
      const axiosConfig = {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': 'c47b12e1a80f487a594dc2e2e561482f', 
        },
      };
      // Fetch fixtures and update state
      Axios.get(apiUrl,axiosConfig)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setFixturesData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching fixtures data:', error);
        });
    
  },[]);

  useEffect(()=>{
    fetchdata()
  },[fetchdata]);

  
  return (
    <div className='fixturePage'>
      <div className='fixtureTitle'>Fixtures</div>
      <div className="fixture-list">
        {fixturesData && fixturesData.response ? (
          <div className="fixture-cards">
            {fixturesData.response.map((fixture) => (
              <div className="fixture-card" key={fixture.fixture.id}>
                <div className="fixture-date">{fixture.fixture.date}</div>
                <div className="fixture-teams">
                  <div className="home-team">
                    <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                    <span>{fixture.teams.home.name}</span>
                  </div>
                  <div className="vs">vs</div>
                  <div className="away-team">
                    <img id='logo' src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                    <span>{fixture.teams.away.name}</span>
                  </div>
                </div>
                {fixture.status && (
                  <div className="fixture-status">{fixture.status.long}</div>
                )}
                <div className="fixture-score">
                  <div className='HT'>Half-Time Score: {fixture.score.halftime.home} - {fixture.score.halftime.away}</div>
                  <div className='FT'>Full-Time Score: {fixture.score.fulltime.home} - {fixture.score.fulltime.away}</div>
                </div>
                <div className="fixture-venue">
                  Venue: {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>Loading fixtures...</h3>
        )}
      </div>
    </div>
  );
}