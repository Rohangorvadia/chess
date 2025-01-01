import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-5 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={"./chessboard.jpeg"} className="max-w-96"></img>
          </div>
          <div className="p-16">
            <div className="flex justify-center">
              <h1 className="text-4xl text-white font-bold">
                Play Chess online for free
                <div className=" absolute left-0 top-1/2 transform -translate-y-1/2 text-sm ">
                  a
                </div>
              </h1>
            </div>
            <div className="p-6 mt-4 flex justify-center">
              <Button
                onClick={() => {
                  navigate("/game");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
