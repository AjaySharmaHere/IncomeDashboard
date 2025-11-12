import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-screen h-screen p-6 flex flex-col justify-center overflow-hidden">
      <div className="grid md:grid-cols-2 justify-center items-center h-full px-8 md:gap-8 gap-16">
        <div className="md:max-w-md mx-auto">
          <h2 className="text-white text-4xl md:text-5xl font-semibold mb-6 !leading-tight">
            Income Dashboard
          </h2>
          <p className="text-slate-200 text-base leading-relaxed">
            Track and visualize your earnings effortlessly — manage all your
            income sources in one clean dashboard.
          </p>

          <div className="mt-12">
            <button
              type="button"
              onClick={handleLogin}
              className="px-6 py-2.5 text-base rounded-md tracking-wider font-semibold outline-none border border-white bg-white text-slate-900 hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
        <div className="md:text-right">
          <img
            src="/assets/login-bg-image.webp"
            alt="cta-img"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
