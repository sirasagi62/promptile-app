import { SessionProvider } from "@/context/session-context";
import { Promptile } from "./pages/main";

function App() {
  return (
    <SessionProvider>
      <Promptile />
    </SessionProvider>
  );
}

export default App;
