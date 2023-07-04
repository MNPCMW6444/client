import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const guideMessages = [
  "Welcome to AIdeator! This tool will help you refine your ideas and accelerate your venture. Let's show you around.",
  "First, let's select your idea. This is the Idea Selector, where you can choose the idea you want to refine.",
  "Now, let's take a look at your idea graph. Each level represents a different aspect of your idea, from the problem you're solving to your go-to-market strategy.",
  "The nodes in the graph are called 'prompts'. Some prompts depend on others, and until those are completed, dependent prompts are 'locked'. To unlock them, complete their dependencies first.",
  "You have different options for running prompts. 'Run All' attempts to run every prompt. 'Run Missing' only runs prompts that haven't been completed yet. 'Run Group' runs a group of prompts together. Choose the one that best fits your current needs.",
  "After running prompts, you'll see results here. Be sure to pay attention to warnings or errors, they can guide you in unlocking and successfully running your prompts.",
  "Don't forget to save your work regularly! Your feedback is also highly valued and helps us improve the tool. Make sure to use these options.",
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

const AIDeator = () => {
  useEffect(() => {
    const isFirstTimeUser = !localStorage.getItem("notFirstTimeUser");
    if (isFirstTimeUser) {
      showGuideMessage(0);
      localStorage.setItem("notFirstTimeUser", "true");
    }
  }, []);
};

export default AIDeator;
