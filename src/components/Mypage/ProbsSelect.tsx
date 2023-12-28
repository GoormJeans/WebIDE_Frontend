import React, { useEffect, useState, useCallback } from 'react'
import { AppDispatch, RootState } from '../../api/store';
import { useDispatch, useSelector } from 'react-redux';
import { addProblems } from '../../api/algoprobs';
import AlgoList from './AlgoList';
import { fetchProblemsApi } from '../../api/api';

const btnCSS = 'text-sm font-semibold rounded-full px-6 py-2 mr-3 mt-5  bg-gray-300 hover:opacity-75 active:opacity-50 transition'

export const CategoryBtn = () => {
  const [selectedButton, setSelectedButton] = useState('all');
  const dispatch = useDispatch<AppDispatch>();
  const allProblems = useSelector((state: RootState) => state.problems);
  const [displayProblems, setDisplayProblems] = useState(allProblems);

  const fetchProblems = useCallback(async () => {
    try {
      const problems = await fetchProblemsApi();  
      dispatch(addProblems(problems));
      setDisplayProblems(problems);
    } catch (error) {
      console.error('Error while fetching problems:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  useEffect(() => {
    switch (selectedButton) {
      case 'all':
        setDisplayProblems(allProblems);
        break;
      case 'solved':
        setDisplayProblems(Object.values(allProblems).filter(problem => problem.solved));
        break;
      case 'unsolved':
        setDisplayProblems(Object.values(allProblems).filter(problem => !problem.solved));
        break;
      default:
        break;
    }
  }, [selectedButton, allProblems]);

  const handleButtonClick = (category: string) => {
    setSelectedButton(category);
  };
  
  return (
    <>
      <button
        className={`${btnCSS} ${selectedButton === 'all' ? ' bg-slate-600 text-white' : 'bg-gray-200'}`}
        onClick={() => handleButtonClick('all')}
      >
        All
      </button>
      <button
        className={`${btnCSS} ${selectedButton === 'solved' ? 'bg-green-300 text-white' : 'bg-gray-200'}`}
        onClick={() => handleButtonClick('solved')}
      >
        Solved
      </button>
      <button
        className={`${btnCSS} ${selectedButton === 'unsolved' ? 'bg-yellow-300 text-white' : 'bg-gray-200'}`}
        onClick={() => handleButtonClick('unsolved')}
      >
        Unsolved
      </button>

      <AlgoList probs={displayProblems} />
    </>
  )
}
