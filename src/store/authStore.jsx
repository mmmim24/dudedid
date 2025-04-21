import React from 'react';
import supabase from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Error fetching session:', error);
            }

            setUser(session?.user || null);
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user || null);
                setLoading(false);
                if (event === 'SIGNED_IN' && session.user) {
                    toast(`Hello ${session.user.user_metadata.full_name}!`, {
                        position: "top-right",
                        icon: '👋',
                    });
                } else if (event === 'SIGNED_OUT') {
                    toast.success('Signed out', {
                        position: "top-right",
                        icon: '🤝'
                    });
                }
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
            }
        });

        if (error) {
            toast.error('Error signing in with Google', {
                position: "top-right"
            });
            console.error('Error signing in with Google:', error);
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            toast.error('Error signing out', {
                position: "top-right"
            });
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.use(AuthContext);
export default AuthProvider;