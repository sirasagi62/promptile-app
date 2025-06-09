import { SessionProvider } from "@/context/session-context";
import { Promptile } from "./pages/main";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import the i18n configuration

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <SessionProvider>
        <Promptile />
      </SessionProvider>
    </I18nextProvider>
  );
}

export default App;
