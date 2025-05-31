import React from 'react';

const PrivacyPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    React.createElement("div", { className: "container mx-auto p-4 sm:p-6 md:p-8 bg-slate-800 rounded-lg shadow-xl text-gray-300 max-w-4xl w-full my-4 sm:my-6" },
      React.createElement("h1", { className: "text-3xl sm:text-4xl font-bold text-sky-400 mb-6 sm:mb-8 text-center" }, "Privacy Policy for Our Unblocked Games"),
      React.createElement("div", { className: "space-y-4 text-base sm:text-lg leading-relaxed" },
        React.createElement("p", null, "Welcome to our Privacy Policy page. Your privacy is critically important to us, especially as you enjoy our Unblocked Bird game and other offerings in the realm of ", React.createElement("strong", null, "unblocked games"), "."),
        React.createElement("h2", { className: "text-2xl font-semibold text-sky-500 mt-6 mb-3 pt-2 border-t border-slate-700" }, "Information We Collect for Unblocked Games"),
        React.createElement("p", null, "Currently, our Unblocked Bird game, a popular choice among ", React.createElement("strong", null, "unblocked games"), ", operates entirely client-side. We do not collect any personal data from you directly through the game. Your high score for this unblocked game is stored locally in your browser's local storage and is not transmitted to us or any third party."),
        React.createElement("h2", { className: "text-2xl font-semibold text-sky-500 mt-6 mb-3 pt-2 border-t border-slate-700" }, "Local Storage and Unblocked Games Scores"),
        React.createElement("p", null, "We use local storage to save your high score for Unblocked Bird. This information remains on your device and is not accessed by us. You can clear your browser's local storage at any time to remove this data related to your ", React.createElement("strong", null, "unblocked games"), " activity."),
        React.createElement("h2", { className: "text-2xl font-semibold text-sky-500 mt-6 mb-3 pt-2 border-t border-slate-700" }, "Third-Party Services for Unblocked Games"),
        React.createElement("p", null, "This website, offering ", React.createElement("strong", null, "unblocked games"), " like Unblocked Bird, uses CDN (Content Delivery Network) services for libraries like React and Tailwind CSS. These CDNs may have their own data collection practices. We encourage you to review their privacy policies. We do not currently integrate other third-party services that would collect personal information from users playing our ", React.createElement("strong", null, "unblocked games"), " or browsing related content like ", React.createElement("strong", null, "unblocked games 76"), " or ", React.createElement("strong", null, "unblocked games 6x"), " discussions."),
        React.createElement("h2", { className: "text-2xl font-semibold text-sky-500 mt-6 mb-3 pt-2 border-t border-slate-700" }, "Changes to This Policy for Unblocked Games"),
        React.createElement("p", null, "We may update our Privacy Policy from time to time, particularly as our offerings of ", React.createElement("strong", null, "unblocked games"), " evolve. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."),
        React.createElement("h2", { className: "text-2xl font-semibold text-sky-500 mt-6 mb-3 pt-2 border-t border-slate-700" }, "Contact Us About Unblocked Games Privacy"),
        React.createElement("p", null, "If you have any questions about this Privacy Policy concerning Unblocked Bird or any of our ", React.createElement("strong", null, "unblocked games"), " content, please feel free to reach out to us via the \"Contact\" page on this website."),
        React.createElement("p", { className: "mt-8 text-sm text-gray-500" }, "Last updated: ", currentDate)
      )
    )
  );
};

export default PrivacyPage;