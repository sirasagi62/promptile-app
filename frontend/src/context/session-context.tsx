import React, { createContext, useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getDB, Session } from '../lib/session-db';

type SessionContextType = {
  sessions: Session[];
  currentSessionId: string | null;
  addSession: (title: string) => void;
  deleteSession: (id: string) => void;
  switchSession: (id: string) => void;
  updateSessionTitle: (id: string, title: string) => void;
  updateSessionTemplate: (id: string, template: string) => void;
  updateSessionVariables: (id: string, variables: Record<string, string>) => void; // Add updateSessionVariables
  currentSession: Session | undefined;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    const loadSessions = async () => {
      const db = await getDB();
      const storedSessions = await db.getAll('sessions');
      const sortedSessions = storedSessions.sort((a, b) => b.createdAt - a.createdAt);
      setSessions(sortedSessions);
      if (sortedSessions.length > 0) {
        setCurrentSessionId(sortedSessions[0].id);
      }
    };

    loadSessions();
  }, []);

  // Function to add a new session
  const addSession = async (title: string) => {
    const newSession: Session = {
      id: nanoid(),
      title: title,
      template: "",
      createdAt: Date.now(),
      variables: {}, // Initialize variables for new sessions
    };
    const db = await getDB();
    const tx = db.transaction('sessions', 'readwrite');
    await tx.store.add(newSession);
    await tx.done;

    const updatedSessions = [...sessions, newSession].sort((a, b) => b.createdAt - a.createdAt);
    setSessions(updatedSessions);
    setCurrentSessionId(newSession.id);
  };

  // Function to delete a session
  const deleteSession = async (id: string) => {
    const db = await getDB();
    const tx = db.transaction('sessions', 'readwrite');
    await tx.store.delete(id);
    await tx.done;

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
  const updateSessionTitle = async (id: string, title: string) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, title: title } : session
    );
    setSessions(updatedSessions);

    const sessionToUpdate = updatedSessions.find((session) => session.id === id);
    if (sessionToUpdate) {
      const db = await getDB();
      const tx = db.transaction('sessions', 'readwrite');
      await tx.store.put(sessionToUpdate);
      await tx.done;
    }
  };

  // Function to update a session's template
  const updateSessionTemplate = async (id: string, template: string) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, template: template } : session
    );
    setSessions(updatedSessions);

    const sessionToUpdate = updatedSessions.find((session) => session.id === id);
    if (sessionToUpdate) {
      const db = await getDB();
      const tx = db.transaction('sessions', 'readwrite');
      await tx.store.put(sessionToUpdate);
      await tx.done;
    }
  };

  // Function to update a session's variables
  const updateSessionVariables = async (id: string, variables: Record<string, string>) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, variables: variables } : session
    );
    setSessions(updatedSessions);

    const sessionToUpdate = updatedSessions.find((session) => session.id === id);
    if (sessionToUpdate) {
      const db = await getDB();
      const tx = db.transaction('sessions', 'readwrite');
      await tx.store.put(sessionToUpdate);
      await tx.done;
    }
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
        updateSessionVariables, // Provide the new function
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
