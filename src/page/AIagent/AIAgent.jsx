import React, { useState } from 'react';
import axios from 'axios';
import './AIAgent.css';

const AIAgent = () => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const prompt =
    'Provide a numbered list of actionable steps to end world hunger';
  const maxTokens = 80;

  // const data = "\n\n1. All people should have access to food.\n\n2. No one should go hungry."
  const [openAIResponse, setOpenAIResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchOpenAIResponse() {
    try {
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
      const bulletPoints = data.choices[0].text.split("\n\n").filter((item) => item.trim() !== '');
      setOpenAIResponse(bulletPoints);

    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div>
      <button onClick={fetchOpenAIResponse}>Fetch OpenAI Response</button>
      {isLoading && <p>Loading...</p>}
      {openAIResponse.length > 0 && (
        <div className="bullet-points">
          {openAIResponse.map((bulletPoint) => (
            <h5 key={bulletPoint}>{bulletPoint}</h5>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAgent;
