import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/team_manage');
  }, [])

  return (
    <span className="text-xl font-bold">欢迎使用物联网实验室官网后台</span>
  )
}

export default Home;
