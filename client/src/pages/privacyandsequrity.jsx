import { FaShieldAlt, FaLock, FaUserSecret, FaUserShield } from "react-icons/fa";

const PrivacySecurity = () => {
  const policies = [
    { title: "🔐 Data Encryption", description: "All user data is encrypted using AES-256 encryption to ensure maximum security." },
    { title: "🛡️ Secure Authentication", description: "We implement OAuth2 and JWT authentication for safe and seamless login experiences." },
    { title: "🔍 Data Transparency", description: "Users can request a copy of their stored data or delete their account at any time." },
    { title: "🚫 No Third-Party Tracking", description: "We respect your privacy and do not share your data with third-party advertisers." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 light:">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center">🔹 Privacy & Security</h1>
      
      {/* Security Practices Section */}
      <div className="w-full max-w-3xl dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-8 border border-gray-700 bg-gray-200">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaShieldAlt className="text-purple-400" /> Security Practices
        </h2>
        
        <div className="space-y-4">
          {policies.map((policy, index) => (
            <div key={index} className="p-4 dark:bg-gray-800 rounded-lg transition bg-white border-[1px]  border-gray-800">
              <h3 className="text-lg font-semibold ">{policy.title}</h3>
              <p className="mt-1">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Privacy Section */}
      <div className="w-full max-w-3xl dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-600 bg-gray-200">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUserSecret className="text-purple-500" /> Your Privacy Matters
        </h2>
        <p className="mb-4">
          We are committed to protecting your privacy. You have control over your personal data, and we ensure compliance with industry standards.
        </p>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <PrivacyItem icon={<FaLock />} title="Change Password" description="Update your password for better security." />
          <PrivacyItem icon={<FaUserShield />} title="Manage Permissions" description="Control what data you share with us." />
        </div>
      </div>
    </div>
  );
};

// Reusable Privacy Item Component
const PrivacyItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-4 p-4 dark:bg-gray-800 rounded-lg shadow-md transition w-full bg-white border-[1px] border-gray-800">
      <span className="text-3xl text-purple-500">{icon}</span>
      <div>
        <h3 className="text-lg font-semibold ">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PrivacySecurity;
