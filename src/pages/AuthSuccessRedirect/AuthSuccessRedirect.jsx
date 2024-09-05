/** External */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import toast, { Toaster } from "react-hot-toast";

/** Utils */
import { postAuthToBackend } from "/utils/api";

/**
 * This page is used to redirect the user to dashboard
 * It is required so as to same the new user to the database
 */
const AuthSuccessRedirect = () => {
  const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    const sendAuthData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          await postAuthToBackend(token, {
            email: user.email,
            first_name: user.given_name,
            last_name: user.family_name,
            image_url: user.picture,
          });
          navigate("/dashboard");
        } catch (e) {
          toast.error("Authentication failed.");
          setTimeout(() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
          }, 1000);
        }
      }
    };

    sendAuthData();
  }, [isAuthenticated, user, getAccessTokenSilently, navigate]);

  return (
    <>
      <div>Please wait while we authenticate you..</div>
      <Toaster />
    </>
  );
};

export default AuthSuccessRedirect;
