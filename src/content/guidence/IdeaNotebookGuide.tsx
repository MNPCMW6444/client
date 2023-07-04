import { useEffect } from "react";
import { toast } from "react-toastify";

const guideMessages = [
  "Welcome to the Idea Notebook! Here, you can view, create, and modify your ideas.",
  "Switch between ideas using the tabs at the top. Each tab represents an idea.",
  "Create a new idea by clicking the 'New' button at the top right. An empty idea will be created for you to fill in.",
  "Edit an existing idea by selecting it from the tabs, then type in the text field below the tabs. Your changes won't be saved until you click the 'Save this Idea' button.",
  "Save your changes to an idea by clicking the 'Save this Idea' button. Remember to save regularly to avoid losing your work!",
  "If you want to delete an idea, use the 'Delete this Idea' button. Be careful, as this action cannot be undone!",
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

const IdeaNotebook = () => {
  useEffect(() => {
    const isFirstTimeUser = !localStorage.getItem("notFirstTimeUser");
    if (isFirstTimeUser) {
      showGuideMessage(0);
      localStorage.setItem("notFirstTimeUser", "true");
    }
  }, []);
};

export default IdeaNotebook;
