import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const guideMessages = [
  "Welcome to IdeaDeck! This module helps you manage and strategize your innovative ideas effectively.",
  "Start by selecting an idea using the IdeaSelector component. You can switch between your ideas depending on which one you're currently working on.",
  "Your idea will be represented as a graph. Each node in the graph is a different aspect of your idea, such as market fit, product feasibility, and more.",
  "To get detailed information on each aspect of your idea, simply click on the nodes.",
  "These insights can be used to formulate a comprehensive business plan. IdeaDeck provides valuable information that can help you highlight strengths, address weaknesses, and strategize better for your business.",
  "Preparing your investor deck? The insights and structure provided by IdeaDeck can help you build a persuasive and thorough presentation for potential investors.",
  "Not just planning, IdeaDeck can assist in execution as well. Use the insights to guide your development process, focus on important areas, and manage resources more effectively.",
  "From identifying market gaps to understanding customer needs, IdeaDeck provides deep insights to devise effective marketing strategies. Gain a deeper understanding of your target audience and tailor your strategies accordingly.",
];

function showGuideMessage(index: number) {
  if (index >= guideMessages.length) {
    return;
  }

  toast.info(guideMessages[index], {
    closeOnClick: true,
    autoClose: false,
    onClose: () => showGuideMessage(index + 1),
  });
}

const IdeaDeck = () => {
  useEffect(() => {
    const isFirstTimeUser = !localStorage.getItem("notFirstTimeUser");
    if (isFirstTimeUser) {
      showGuideMessage(0);
      localStorage.setItem("notFirstTimeUser", "true");
    }
  }, []);
};

export default IdeaDeck;
