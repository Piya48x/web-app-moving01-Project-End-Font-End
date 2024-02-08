/* eslint-disable no-unused-vars */

import Navbar from "../Navbar/Navbar";
import backgroundImage from "./1.png";

const HomeStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "800px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  position: "relative",
};

const textContainerStyle = {
  marginTop: "0px",
  marginBottom: "100px",
  textAlign: "center",
};

function About() {
  return (
    <>
      <div style={HomeStyle}>
        <Navbar />
        <div style={textContainerStyle}>
          <>
            <h1 className="font-bold text-2xl mb-6">Our About</h1>
            <hr className="w-40 mx-auto mb-6" />
            <div className="text-center">
              <div className="h-300 bg-gray-200 rounded-lg mt-6 p-6">
                <div className="flex justify-center">
                  <div className="rounded-full overflow-hidden border-4 border-white w-24 h-24">
                    <img
                      src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/370908546_1975921156116128_816666289389713510_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=66OeyE9sBqYAX9kDsyo&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCgcNfUgxE81DasrskhbgbTyr-bHTidu35ruyRh_1gmuA&oe=65C5CAFB"
                      alt="Avatar Image"
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="text-xl font-semibold">Piya Pholuea</h6>
                  <p className="text-gray-600">
                    computer science In the 4-year bachelors degree program,
                    regular semester Computer Science at Maha Sarakham
                    Rajabhat University Center Campus
                  </p>
                  <p className="text-gray-600">
                    Born on 13/10/2000 in Kalasin Province. and current
                    address at Kham Pa-o Kuddon, Huai Mek district/district
                    Kalasin Province 46170 Telephone 0934177064
                  </p>
                </div>
              </div>
              <div className="h-100 bg-gray-800 flex items-center justify-center">
                <p className="text-white">Copyright 2024</p>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default About;
