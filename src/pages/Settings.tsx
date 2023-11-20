import Page from "../components/layout/Page";
import { SunMoon } from "lucide-preact";

const Settings = () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <Page>
      <button onClick={toggleDarkMode}><SunMoon /></button>
    </Page>
  );
};

export default Settings;
