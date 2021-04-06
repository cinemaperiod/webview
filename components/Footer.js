export default function Footer() {
  return (
    <footer className='footer'>
      <div>
        Developed by <a href='javascript:void(0)' target='_blank'>Arun Srinivas</a>. All rights reserved with Cinema Period, &copy; 2021.
        </div>
        <style jsx>{`
          .footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.6rem;
            text-align: center;
          }
        `}
        </style>
    </footer>
  );
}