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
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    const sendAuthData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          console.log({ token });
          await postAuthToBackend(token, {
            email: user.email,
            name: user.name,
          });
          navigate("/dashboard");
        } catch (e) {
          navigate("/login");
          toast.error("Failed to authenticate");
        }
      }
    };

    sendAuthData();
  }, [isAuthenticated, user, getAccessTokenSilently, navigate]);

  return (
    <>
      <div>Redirecting to dashboard..</div>
      <Toaster />
    </>
  );
};

export default AuthSuccessRedirect;
