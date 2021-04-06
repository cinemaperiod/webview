export default function Button() {
  return (<>
    <button className='btn'>View Details</button>
    <style jsx>{`
      .btn {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 1.5rem 1.2rem;
        border-radius: 5px;
        border: 2px solid #000;
        outline: none;
        background: #191919;
        color: #fff;
        cursor: pointer;
        margin-top: 2rem;
        font-size: 1.6rem;
        letter-spacing: 1.2px;
        font-weight: bold;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        transition: color 0.2s ease, background 0.2s ease;
        width: 100%;
      }
      .btn:hover,
      .btn:focus,
      .btn:active, {
        background: #fff;
        color: #000;
      }
    `}
    </style>
  </>)
};