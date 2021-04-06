import Link from 'next/link';
import navigationData from '../data/navigation.json';

const DesktopNavigation = () => {
  const { menuItems = [] } = navigationData || {};

  return (
    <div className='menu-header'>
      <div className='logo'>
        <span className='highlight-text'>C</span>inema &nbsp;
        <span className='highlight-text'>P</span>eriod</div>
        <ul className='dropdown-list'>
          {menuItems.length > 0 && menuItems.map((menuItem, index) => {
            return (<li key={index}><Link href={menuItem.url}><a>{menuItem.name}</a></Link></li>)
          })}
      </ul>
      <style jsx>{`
        .menu-header {
          display: flex;
          justify-content: space-evenly;
          width: 100%;
          border-bottom: 0.2rem solid #66ddaa;
          border-radius: 50%;
          margin-bottom: 1.5rem;
        }
        .logo {
          font-size: 2.4rem;
          color: #404040;
          line-height: 3.4rem;
          -webkit-text-fill-color: #404040;
          -webkit-text-stroke-width: 2px;
          // -webkit-text-stroke-color: #404040;
          letter-spacing: 0.08rem;
        }
        .logo > span {
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke-width: 1px;
          font-size: 3rem;
        }
        .dropdown-list {
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }
        .dropdown-list li {
          padding: 5px 10px;
        }
        .dropdown-list li a:after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: #000;
          transition: width .3s;
        }
        .dropdown-list li a {
          font-size: 2rem;
        }
        // .dropdown-list li a:hover {
        //   border-bottom: 1px solid #444;
        // }
        .dropdown-list li a:hover::after {
          width: 100%;
          //transition: width .3s;
        }
      `}
      </style>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      navigationData: navigationData
    }
  }
}

export default DesktopNavigation;