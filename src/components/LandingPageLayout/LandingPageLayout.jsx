// external
import PropTypes from "prop-types";

// components
import { Header, Footer } from "../../components";

const LandingPageLayout = (props) => {
  const { children, setTopBarProgress } = props;
  return (
    <>
      <Header setTopBarProgress={setTopBarProgress} />
      {children}
      <Footer />
    </>
  );
};

LandingPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  setTopBarProgress: PropTypes.func.isRequired,
};

export default LandingPageLayout;
