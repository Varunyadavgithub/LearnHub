import { useGetCourseDetailWithStatusQuery } from "@/app/features/api/purchaseApi";
import { useParams } from "react-router-dom";

export const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);
  if (isLoading) {
    return <p>Loading....</p>;
  }
  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};
