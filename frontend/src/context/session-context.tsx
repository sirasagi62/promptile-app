import React, { createContext, useState, useContext } from 'react';

// Define the structure for session data
type Session = {
  id: string;
  title: string;
  template: string; // Add template property
  // Add other session-related data here, like history, etc.
};

type SessionContextType = {
  sessions: Session[];
  currentSessionId: string | null;
  addSession: (title: string) => void;
  deleteSession: (id: string) => void;
  switchSession: (id: string) => void;
  updateSessionTitle: (id: string, title: string) => void;
  updateSessionTemplate: (id: string, template: string) => void; // Add updateSessionTemplate
  currentSession: Session | undefined;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Function to add a new session
  const addSession = (title: string) => {
    const newSession: Session = {
      id: crypto.randomUUID(), // Generate a unique ID
      title: title,
      template: "", // Initialize with an empty template
    };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newSession.id);
  };

  // Function to delete a session
  const deleteSession = (id: string) => {
    const updatedSessions = sessions.filter((session) => session.id !== id);
    setSessions(updatedSessions);
    if (currentSessionId === id) {
      setCurrentSessionId(updatedSessions.length > 0 ? updatedSessions[0].id : null);
    }
  };

  // Function to switch to a different session
  const switchSession = (id: string) => {
    setCurrentSessionId(id);
  };

  // Function to update a session's title
  const updateSessionTitle = (id: string, title: string) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, title: title } : session
    );
    setSessions(updatedSessions);
  };

  // Function to update a session's template
  const updateSessionTemplate = (id: string, template: string) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, template: template } : session
    );
    setSessions(updatedSessions);
  };

  const currentSession = sessions.find((session) => session.id === currentSessionId);

  return (
    <SessionContext.Provider
      value={{
        sessions,
        currentSessionId,
        addSession,
        deleteSession,
        switchSession,
        updateSessionTitle,
        updateSessionTemplate,
        currentSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
