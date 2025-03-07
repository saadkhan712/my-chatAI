import { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatBot() {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  async function generateAnswer() {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setChat((prevChat) => [...prevChat, userMessage]);
    setQuestion("");
    setLoading(true);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
      }
    );

    const data = await response.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

    setLoading(false);
    setChat((prevChat) => [...prevChat, { role: "ai", text: textResponse }]);
  }

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [chat, loading]);

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      generateAnswer();
    }
  }

  return (
    <div className="flex flex-col h-screen p-4 sm:p-5 ">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pb-24">
        {chat.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 text-base sm:text-lg font-semibold ${message.role === "user" ? "self-end max-w-[75%] sm:max-w-[60%] bg-slate-300 dark:bg-slate-800 rounded-lg" : "bg-none self-start max-w-[90%] sm:max-w-[97%]"}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, children, ...props }) {
                    return !inline ? (
                      <SyntaxHighlighter style={dracula} language="javascript" PreTag="div" {...props}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-gray-800 p-1 rounded">{children}</code>
                    );
                  }
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[90%] px-4 py-2 rounded-xl bg-gray-700 text-white">
              <p>Loading...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-700 bg-white dark:bg-gray-800 flex items-center absolute bottom-0 left-0 right-0 z-10 w-full rounded-t-xl sm:w-auto sm:rounded-xl sm:ml-auto sm:mr-auto sm:max-w-2xl mb-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-600 focus:outline-none text-sm sm:text-base"
        ></textarea>
        <button
          className="ml-2 sm:ml-4 px-3 sm:px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 focus:outline-none flex items-center justify-center"
          onClick={generateAnswer}
          disabled={loading}
        >
          {loading ? "..." : <PaperAirplaneIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
