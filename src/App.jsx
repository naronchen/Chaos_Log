import './App.css'
import Tasks from './components/Tasks/Tasks'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import SignInPage  from './page/SignIn/SignInPage'
import { supabase } from './client'


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <SignInPage />;
  } else {
    return (
    <div>
      Logged in!
      <Tasks />
    </div>
    )
  }
}


  // return (
  //   <div className="App">
  //     <h2>Task Manager 🚀 </h2>
  //     <Tasks />
  //   </div>
  // )
// }

export default App
