import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { userid: null, username: "" };
  });

  useEffect(() => {
    // Update localStorage whenever user state changes
    if (user.userid) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const update = (userid, username) => {
    setUser({ userid, username });
  };

  return (
    <NoteContext.Provider value={{ user, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
