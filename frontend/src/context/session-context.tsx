import React, { createContext, useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getDB, Session } from '../lib/session-db';
import { extractMustacheVariables } from '../lib/template-utils';
import { TemplateVariableData } from '../atoms'; // Import TemplateVariableData

type SessionContextType = {
  sessions: Session[];
  currentSessionId: string | null;
  addSession: (title: string) => void;
  deleteSession: (id: string) => void;
  switchSession: (id: string) => void;
  updateSessionTitle: (id: string, title: string) => void;
  updateSessionTemplate: (id: string, template: string) => void;
  updateSessionVariables: (id: string, variables: Record<string, TemplateVariableData>) => void; // Updated type
  currentSession: Session | undefined;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, _setCurrentSessionId] = useState<string | null>(null);
  const setCurrentSessionId=(id: string|null)=>{
    if (id) localStorage.setItem('lastActiveSessionId',id)
    _setCurrentSessionId(id)
  }

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const db = await getDB();
        const storedSessions = await db.getAll('sessions');
        const sortedSessions = storedSessions.sort((a, b) => b.createdAt - a.createdAt);
        setSessions(sortedSessions);

        let lastActiveSessionId = localStorage.getItem('lastActiveSessionId');

        if (lastActiveSessionId) {
          // Check if the last active session still exists
          const foundSession = sortedSessions.find(s => s.id === lastActiveSessionId);
          if (foundSession) {
            lastActiveSessionId = foundSession.id;
          }
        }

        // If no specific session was found or preferred, default to the most recent one
        if (!lastActiveSessionId && sortedSessions.length > 0) {
          lastActiveSessionId = sortedSessions[0].id;
        }

        setCurrentSessionId(lastActiveSessionId);

      } catch (error) {
        console.error("Failed to load sessions from DB:", error);
      }
    };

    loadSessions();
  }, []);

  // Helper function to update a session in state and persist to IndexedDB
  const _updateAndPersistSession = async (
    id: string,
    updater: (session: Session) => Session
  ) => {
    const sessionToModify = sessions.find((s) => s.id === id);
    if (!sessionToModify) {
      console.warn(`Attempted to update non-existent session with ID: ${id}`);
      return;
    }

    const updatedSession = updater(sessionToModify);

    // Update state optimistically
    setSessions((prevSessions) =>
      prevSessions.map((s) => (s.id === id ? updatedSession : s))
    );

    // Persist to IndexedDB
    try {
      const db = await getDB();
      const tx = db.transaction('sessions', 'readwrite');
      await tx.store.put(updatedSession);
      await tx.done;
    } catch (error) {
      console.error(`Failed to persist session ${id} to DB:`, error);
      // Optionally, revert state or show error to user
      // For now, just log the error.
    }
  };

  // Function to add a new session
  const addSession = async (title: string) => {
    const newSession: Session = {
      id: nanoid(),
      title: title,
      template: "",
      createdAt: Date.now(),
      variables: {}, // Initialize variables for new sessions as Record<string, TemplateVariableData>
    };

    try {
      const db = await getDB();
      const tx = db.transaction('sessions', 'readwrite');
      await tx.store.add(newSession);
      await tx.done;

      const updatedSessions = [...sessions, newSession].sort((a, b) => b.createdAt - a.createdAt);
      setSessions(updatedSessions);
      setCurrentSessionId(newSession.id);
    } catch (error) {
      console.error("Failed to add new session to DB:", error);
    }
  };

  // Function to delete a session
  const deleteSession = async (id: string) => {
    try {
      const db = await getDB();
      const tx = db.transaction('sessions', 'readwrite');
      await tx.store.delete(id);
      await tx.done;

      const updatedSessions = sessions.filter((session) => session.id !== id);
      setSessions(updatedSessions);
      if (currentSessionId === id) {
        setCurrentSessionId(updatedSessions.length > 0 ? updatedSessions[0].id : null);
      }
    } catch (error) {
      console.error(`Failed to delete session ${id} from DB:`, error);
    }
  };

  // Function to switch to a different session
  const switchSession = (id: string) => {
    setCurrentSessionId(id);
  };

  // Function to update a session's title
  const updateSessionTitle = async (id: string, title: string) => {
    await _updateAndPersistSession(id, (session) => ({ ...session, title }));
  };

  // Function to update a session's template and extract variables atomically
  const updateSessionTemplate = async (id: string, template: string) => {
    await _updateAndPersistSession(id, (session) => {
      const newExtractedVariables = extractMustacheVariables(template);
      const updatedVariables: Record<string, TemplateVariableData> = {};

      // Preserve types and values for existing variables, add new ones with default "string" type and empty value
      newExtractedVariables.forEach((variable) => {
        updatedVariables[variable] = session.variables[variable] || { type: "string", value: "" };
      });

      return {
        ...session,
        template: template,
        variables: updatedVariables, // Update variables here
      };
    });
  };

  // Function to update a session's variables (used by VariablePanel for manual changes)
  const updateSessionVariables = async (id: string, variables: Record<string, TemplateVariableData>) => { // Updated type
    await _updateAndPersistSession(id, (session) => ({ ...session, variables }));
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
        updateSessionVariables,
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
