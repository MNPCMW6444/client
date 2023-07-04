import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const guideMessages = [
  "Welcome to CRITIQ! This is your one-stop platform for validating and improving your innovative ideas.",
  "Start by selecting the idea you wish to validate in the 'Run CritIQ' section. If you don't have an idea yet, add one by typing in the idea field and clicking 'Add Idea'.",
  "Next, you'll need to answer a questionnaire tailored to your idea. The questionnaire is designed to provide essential information for CritIQ bot to effectively analyze your idea.",
  "Once you've answered the questionnaire, click on 'Run CritIQ'. The CritIQ bot will now analyze your idea based on the information provided.",
  "CritIQ will provide a comprehensive analysis using three scores: the Fail Score, the Lean Score, and the Failean Score. These scores respectively represent the likelihood of failure, the estimated resources needed, and an overall feasibility measure.",
  "Additionally, CritIQ will provide detailed insights and highlight any information gaps, potential pitfalls, and unproven assumptions within your idea.",
  "CritIQ also provides a set of validation tasks to help improve your idea and increase its feasibility. Use these tasks to create a validation roadmap for your idea.",
  "In the 'CritiChat' section, you can interact with our bot. Type questions or statements in the chat interface about your idea and get immediate responses from the bot.",
  "If you're unsure what to ask, use the 'Generate a question' button, and the bot will provide a question for you. When you're ready to send your message, click the 'Send' button.",
  "The chat is a great way to explore your idea further, clarify any ambiguities, and refine your idea based on the bot's feedback.",
  "Remember, the goal of CRITIQ is to help you refine and improve your ideas. Don't be discouraged by initial low scores. Use the insights to iterate on your idea and improve it. Happy brainstorming!",
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

const CRITIQGuide = () => {
  useEffect(() => {
    const isFirstTimeUser = !localStorage.getItem("notFirstTimeUser");
    if (isFirstTimeUser) {
      showGuideMessage(0);
      localStorage.setItem("notFirstTimeUser", "true");
    }
  }, []);
};

export default CRITIQGuide;
