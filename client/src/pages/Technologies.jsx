import { FaReact, FaNodeJs, FaServer, FaCode } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiOpenai } from "react-icons/si";

const Technologies = () => {
  const techStack = [
    { name: "React.js", icon: <FaReact />, description: "Frontend UI development." },
    { name: "Node.js", icon: <FaNodeJs />, description: "Backend server-side logic." },
    { name: "Express.js", icon: <SiExpress />, description: "Lightweight backend framework." },
    { name: "MongoDB", icon: <SiMongodb />, description: "Database for storing user information." },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, description: "CSS framework for styling." },
    { name: "OpenAI API", icon: <SiOpenai />, description: "AI-powered chatbot responses." },
    { name: "JWT Authentication", icon: <FaServer />, description: "Secure user authentication." },
    { name: "REST APIs", icon: <FaCode />, description: "Connecting frontend & backend." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        🔧 Technologies & Tools Used
      </h1>

      {/* Technology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {techStack.map((tech, index) => (
          <TechCard key={index} icon={tech.icon} name={tech.name} description={tech.description} />
        ))}
      </div>
    </div>
  );
};

// Reusable Technology Card Component
const TechCard = ({ icon, name, description }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center border border-gray-700  transition">
      <div className="text-4xl text-purple-500 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};

export default Technologies;
