import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../api/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addProblems } from '../../api/algoprobs';
import AlgoList from './AlgoList';

const btnCSS = ' text-sm font-semibold rounded-full px-6 py-2 mr-3 mt-5  bg-gray-300 hover:opacity-75 active:opacity-50	transition'

export const CategoryBtn = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const problems = useSelector((state: RootState) => state.problems);
  const fetchProblems = async (category: string) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/problems/${category}`);
      console.log(response.data);
      dispatch(addProblems(response.data));
    } catch (error) {
      console.error('Error while fetching problems:', error);
    }
  };

  useEffect(() => {
    fetchProblems(selectedButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedButton]);

  const handleButtonClick = (category: string) => {
    setSelectedButton(category);

  };
  return (
    <>
      <button
        className={`${btnCSS} ${selectedButton === 'solved' ? 'bg-green-300	 text-white' : 'bg-gray-200'}`}
        onClick={() => handleButtonClick('solved')}
      >
        Solved
      </button>
      <button
        className={`${btnCSS} ${selectedButton === 'tried' ? 'bg-yellow-300 text-white' : 'bg-gray-200'}`}
        onClick={() => handleButtonClick('tried')}
      >
        Tried
      </button>

      <AlgoList probs={problems} />
    </>
  )
}

