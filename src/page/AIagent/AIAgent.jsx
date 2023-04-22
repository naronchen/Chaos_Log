import React, { useState } from 'react';
import axios from 'axios';
import './AIAgent.css';
import Navbar from '../../components/Navbar';

import MainContainer from '../../components/MainContainer';

const AIAgent = () => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const maxTokens = 80;

  const [objective, setObjective] = useState('');
  const [openAIResponse, setOpenAIResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchOpenAIResponse() {
    try {
      const prompt =
        `Provide a numbered list of actionable steps to achieve ${objective}`;

      setIsLoading(true);
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt,
          max_tokens: maxTokens,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      console.log(response)
      const { data } = response;
      const originalString = data.choices[0].text;
      const stringWithoutFirstPart = originalString.replace(/^[^\n]*\n\n/, '');
      const bulletPoints = stringWithoutFirstPart.split("\n\n").filter((item) => item.trim() !== '');
      setOpenAIResponse(bulletPoints);

    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleObjectiveChange = (event) => {
    setObjective(event.target.value.slice(0, 30));
  };

  return (
    <MainContainer>
      <Navbar />
      <div>
        <label htmlFor="objective">Objective: </label>
        <input
          type="text"
          id="objective"
          value={objective}
          onChange={handleObjectiveChange}
          maxLength={30}
          className="objective-input"
        />
      </div>
      <button onClick={fetchOpenAIResponse}>Fetch OpenAI Response</button>
      {isLoading && <p>Loading...</p>}
      {openAIResponse.length > 0 && (
        <div className="bullet-points">
          {openAIResponse.map((bulletPoint) => (
            <h5 key={bulletPoint}>{bulletPoint}</h5>
          ))}
        </div>
      )}
    </MainContainer>
  );
};

export default AIAgent;
