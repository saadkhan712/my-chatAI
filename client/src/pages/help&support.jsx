import { FaEnvelope, FaDiscord, FaGithub, FaQuestionCircle } from "react-icons/fa";

const HelpSupport = () => {
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to the login page and click 'Forgot Password'. Follow the instructions sent to your email." },
    { question: "How do I report a bug?", answer: "You can report issues on our GitHub repository or contact support via email." },
    { question: "Can I request a new feature?", answer: "Yes! Join our Discord community and share your ideas." },
    { question: "Why is my AI-generated image not loading?", answer: "Ensure your API key is correct and check the server status." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center">🔹 Help & Support</h1>
      
      {/* FAQ Section */}
      <div className="w-full max-w-3xl dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaQuestionCircle className="text-purple-500" /> Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 rounded-lg transition bg-white dark:bg-gray-800 border-gray-800 border-[1px]">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="w-full max-w-3xl dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 bg-white">
        <h2 className="text-2xl font-semibold mb-4">📞 Contact Support</h2>
        <p className="mb-4">If you need further assistance, reach out through any of the following channels:</p>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <ContactItem icon={<FaEnvelope />} title="Email Support" link="mailto:support@yourproject.com" />
          <ContactItem icon={<FaDiscord />} title="Discord Community" link="https://discord.gg/yourserver" />
          <ContactItem icon={<FaGithub />} title="GitHub Issues" link="https://github.com/yourrepo/issues" />
        </div>
      </div>
    </div>
  );
};

// Reusable Contact Item Component
const ContactItem = ({ icon, title, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" 
       className="flex items-center justify-center gap-3 p-4 dark:bg-gray-800 rounded-lg shadow-md transition w-full text-lg bg-gray-200 border-[1px] border-black">
      <span className="text-2xl text-purple-500">{icon}</span>
      <span>{title}</span>
    </a>
  );
};

export default HelpSupport;
