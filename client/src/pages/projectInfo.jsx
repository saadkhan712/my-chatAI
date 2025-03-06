const AboutProject = () => {
  return (
    <div className="w-full p-6 space-y-8 pl-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center">About This Project</h1>
      
      {/* Project Overview */}
      <section>
        <h2 className="text-4xl font-semibold">🚀 Project Overview</h2>
        <p className="text-[18px]">
          This project is a full-stack web application built using the MERN stack. It allows users to generate AI-powered images using the Replicate API. The platform offers authentication, image generation, and a user-friendly experience.
        </p>
      </section>
      
      {/* Features */}
      <section>
        <h2 className="text-4xl font-semibold">✨ Features</h2>
        <ul className="list-disc pl-5 text-[18px]">
          <li>User authentication (Login, Register, Password Reset)</li>
          <li>Dark & Light mode toggle</li>
          <li>Responsive and fast UI with Tailwind CSS</li>
          <li>Secure backend with JWT authentication</li>
          <li>RESTful API architecture</li>
          <li>Change Your Password</li>
        </ul>
      </section>
      
      {/* Tech Stack */}
      <section>
        <h2 className="text-4xl font-semibold">🛠️ Tech Stack</h2>
        <ul className="list-disc pl-5 text-[18px]">
          <li>Frontend: React (Vite) + Tailwind CSS</li>
          <li>Backend: Node.js + Express</li>
          <li>Database: MongoDB + Mongoose</li>
          <li>Authentication: JWT + Bcrypt</li>
          <li>Deployment: Vercel (Frontend) & Render (Backend)</li>
        </ul>
      </section>
      
      {/* Challenges & Fixes */}
      <section>
        <h2 className="text-4xl font-semibold">🐞 Challenges & Fixes</h2>
        <ul className="list-disc pl-5 text-[18px]">
          <li><strong>Issue:</strong> Handling async API calls efficiently</li>
          <li><strong>Fix:</strong> Used React Query for caching and state management</li>
          <li><strong>Issue:</strong> Dark mode flickering</li>
          <li><strong>Fix:</strong> Implemented localStorage to persist theme preferences</li>
          <li><strong>Issue:</strong> Managing environment variables securely</li>
          <li><strong>Fix:</strong> Used dotenv and ignored `.env` in Git</li>
        </ul>
      </section>
      
      {/* How to Contribute */}
      <section>
        <h2 className="text-4xl font-semibold">🤝 How to Contribute</h2>
        <p>Want to contribute? Follow these steps:</p>
        <ol className="list-decimal pl-5 text-[18px]">
          <li>Fork the repository</li>
          <li>Clone it to your local machine</li>
          <li>Run <code>npm install</code> to install dependencies</li>
          <li>Make your changes in a new branch</li>
          <li>Push the changes and create a Pull Request</li>
        </ol>
      </section>
      
      {/* Setup & Installation */}
      <section>
        <h2 className="text-4xl font-semibold">📌 Setup & Installation</h2>
        <p>Follow these steps to set up the project locally:</p>
        <pre className="dark:bg-white dark:text-black bg-black text-white p-4 rounded-md overflow-x-auto">
          <code>
            git clone https://github.com/your-repo.git
            cd project-folder
            npm install
            npm run dev
          </code>
        </pre>
      </section>
      
      {/* Future Improvements */}
      <section>
        <h2 className="text-4xl font-semibold">🚀 Future Improvements</h2>
        <ul className="list-disc pl-5 text-[18px]">
          <li>Add user profiles with image history</li>
          <li>Improve AI prompt optimization for better results</li>
          <li>Enable sharing generated images directly to social media</li>
          <li>Image Generation AI</li>
          <li>Enhance mobile responsiveness</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutProject;
