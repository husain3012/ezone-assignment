import "/styles/global.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen w-screen  bg-black overflow-x-auto">
      <Component {...pageProps} />
      <footer className="mt-auto">
        <div className="text-center text-white ">
          <p>
            Created by{" "}
            <a href="https://github.com/husain3012" target="_blank" rel="noopener noreferrer">
              Husain Shahid Rao
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
export default MyApp;
