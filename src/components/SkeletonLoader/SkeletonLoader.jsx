import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = (props) => {
  return <Skeleton width={100} height={30} {...props} />;
};

export default SkeletonLoader;
