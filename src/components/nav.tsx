import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../api/store';

interface NavItemProps {
  path: string;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ path, label, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(path);
    }
    
  };

  return (
    <div className="text-[#333333] text-lg mr-2 ml-2 hover:cursor-pointer hover:underline" onClick={handleClick}>
      {label}
    </div>
  );
};

const NavItemList = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navi = useNavigate();
  const Logout = () => {
    localStorage.clear();
    console.log('Logout function executed');
    navi('/login');
  };
  return (
    <>
      <NavItem path="/algorithms" label="Algorithms" />
      <NavItem path="/mypage" label="Mypage" />
      <NavItem path={auth.isLoggedIn ? `` : `/login`} label={auth.isLoggedIn ? `Logout` : `Login`} onClick={auth.isLoggedIn ? Logout : () => navi('/login') } />
      <NavItem path="/settings" label="Settings" />
    </>
  );
}

function Nav() {
  const navigate = useNavigate();
  const [navItemsVisible, setNavItemsVisible] = useState(false);

  const toggleNavItems = () => {
    setNavItemsVisible(!navItemsVisible);
  };
  return (
    <nav className="w-full h-20 z-1">
      <div className="px-5 w-auto h-full flex justify-between items-center bg-nav-color mx-5 mt-5 rounded-xl">
        <div className="text-3xl left-0 ml-5 hover:cursor-pointer" onClick={() => navigate('/')}>
          JeansCode
        </div>
        <div className="flex flex-row mobile:hidden">
          <NavItemList />
        </div>
        <div className='tablet:hidden desktop:hidden'>
          <IconButton color="inherit" onClick={toggleNavItems}>
            <FormatListBulletedIcon />
          </IconButton>
          {navItemsVisible && (
            <div className='flex flex-col w-auto p-3 absolute right-5 bg-white rounded-xl border-2 shadow-lg'>
              <NavItemList />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
