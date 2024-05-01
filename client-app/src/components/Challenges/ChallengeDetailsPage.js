import React, { useEffect, useState } from 'react'
import "./ChallengeDetailsPage.css"
import { useParams } from 'react-router-dom'
import { api } from '../../Config';
import axios from 'axios';

function ChallengeDetailsPage() {
  const params = useParams();
  const [challenge, setChallenge] = useState({ scorePoints: [] });

  useEffect(() => {
      const fetchItem = async () => {
          const result = await axios.get(
              `${api}/challenge/getChallenge/${params.id}`
          );
          setChallenge(result.data.result);
      };

      fetchItem();
  }, [params.id]);

  const handleAttemp = (clickekdItem) => {
      const id = clickekdItem._id
      alert(id)
  };

  return (
      <div className="card challenge-details-container">
          <div className="card-body">
              <h3 className="card-title">{challenge.title}</h3>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                  {challenge.description}
              </h6>
              <h3>Score Criteria</h3>
              {challenge.scorePoints.map((item, index) => {
                  return (
                      <p className="card-text" key={index}>
                          {index + 1}. {item}
                      </p>
                  );
              })}
              <p className="card-text">
                  <h3>Time</h3>
                  {challenge.timeDuration} mins
              </p>
              <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAttemp(challenge)}
              >
                  Attemp Quiz
              </button>
          </div>
      </div>
  );
}

export default ChallengeDetailsPage