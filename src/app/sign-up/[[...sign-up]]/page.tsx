import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center relative bg-no-repeat bg-cover bg-center"
    style={{
      backgroundImage: `url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?ga=GA1.1.1060403730.1728526369&semt=ais_hybrid')`,
    }}>
      {/* Sideways Welcome Text */}
      <div className="absolute top-1/4 -left-20 transform -rotate-90 text-gray-600 text-9xl font-extrabold opacity-10">
        WELCOME
      </div>

      {/* Sign-Up Card */}
      <div className="flex flex-col items-center justify-center bg-black shadow-2xl rounded-xl p-10 w-full max-w-md border border-gray-700">

        
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Join Us Today!
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Sign up to unlock amazing features and opportunities.
        </p>
        <SignUp
          appearance={{
            elements: {
              card: "shadow-xl rounded-lg bg-[#00FFFF] p-6 text-lg",
              formButtonPrimary:
                "bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg py-2 px-4 transition-all text-lg",
              input: "bg-gray-800 text-white border border-gray-600 rounded-lg text-lg",
              inputLabel: "text-gray-400 text-lg",
              inputErrorText: "text-red-500 text-lg",
            },
          }}
          
        />
      </div>
    </div>
  );
}
