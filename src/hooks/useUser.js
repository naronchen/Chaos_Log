// useUser.js
import { useState, useEffect } from 'react';
import { supabase } from '../client';

export function useUser() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session ? session.user : null;
      setUserId(user ? user.id : null);
    }

    fetchSession();
  }, []);

  return userId;
}
