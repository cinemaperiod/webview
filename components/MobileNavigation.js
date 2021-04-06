import { useState, useEffect } from 'react';
import Link from 'next/link';
import navigationData from '../data/navigation.json';

const MobileNavigation = () => {
  const [menuStatus, setMenuStatus] = useState(false);
  const { menuHeading = '', menuItems = []} = navigationData || {};

  useEffect(() => {
    if (menuStatus) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [menuStatus]);

  function toggleNavigation() {
    setMenuStatus(!menuStatus);
  }

  return (
    <main className='dropdown-container'>
      <section className='menu-btn'>
        <a onClick={toggleNavigation}>{menuHeading || 'Menu'}</a>
      </section>
      <nav className='dropdown-list'>
        <a className='dropdown-close' onClick={toggleNavigation}>Close</a>
        <ul className='dropdown-content'>
          {menuItems.length > 0 && menuItems.map((menuItem, index) => {
            return (<li key={index}><Link href={menuItem.url}><a>{menuItem.name}</a></Link></li>)
          })}
        </ul>
      </nav>
      <style jsx>{`
          .menu-btn {
            margin-bottom: 1rem;
          }
          .menu-btn a {
            font-size: 2.1rem;
            text-transform: uppercase;
            border-bottom: 1px solid purple;
            font-weight: bold;
            cursor: pointer;
          }
          .menu-btn a:hover {
            border-bottom: 1px dotted #0070f3;
          }
          .dropdown-list {
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            color: #fff;
            visibility: ${menuStatus ? 'visible' : 'hidden'};
            transform: ${menuStatus ? 'translateY(0%)' : 'translateY(-100%)'};
            transition: transform .3s, visibility .3s
          }
          .dropdown-list.is-hidden {
            visibility: hidden;
            transform: translateY(-100%);
          }
          .dropdown-close {
            top: 5px;
            position: absolute;
            z-index: 1;
            right: 15px;
            top: 15px;
            height: 25px;
            width: 25px;
            overflow: hidden;
            text-indent: 100%;
            white-space: nowrap;
            color: transparent;
          }
          .dropdown-close:before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            bottom: auto;
            right: auto;
            height: 20px;
            width: 2px;
            background-color: #fff;
            transform: translateX(-50%) translateY(-50%) rotate(-45deg);
          }
          .dropdown-close:after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            bottom: auto;
            right: auto;
            height: 20px;
            width: 2px;
            background-color: #fff;
            transform: translateX(-50%) translateY(-50%) rotate(45deg);
          }
          .dropdown-content {
            margin-top: 40px;
          }
          .dropdown-content a {
            font-size: 18px;
            transform: translateZ(0);
            backface-visibility: hidden;
            transition: opacity .3s,transform .3s;
            display: block;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 25px;
            height: 60px;
            line-height: 60px;
            border-bottom: 0.5px solid lightgrey;
          }
          @media only screen and (max-width: 768px) {
            .menu-btn {
              text-align: center;
            }
          }
      `}
      </style>
    </main>);
}

export async function getStaticProps() {
  return {
    props: {
      navigationData: navigationData
    }
  }
}

export default MobileNavigation;