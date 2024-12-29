import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/app/features/api/courseApi";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <CourseTableSkeleton />
      </>
    );
  }

  return (
    <>
      <div>
        <Button
          onClick={() => {
            navigate("create");
          }}
        >
          Create new Course
        </Button>
        <Table>
          <TableCaption>A list of your recent Courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.courses.map((course) => (
              <TableRow key={course?._id}>
                <TableCell className="font-medium">
                  {course?.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <Badge>{course?.isPublished ? "Published" : "Draft"}</Badge>
                </TableCell>
                <TableCell>{course?.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`${course?._id}`)}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Courses</TableCell>
              <TableCell className="text-right">{data?.totalCourses}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default CourseTable;

const CourseTableSkeleton = () => (
  <div>
    <div className="h-10 w-1/2 bg-gray-300 rounded mb-4 animate-pulse"></div>
    <div className="grid gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-10 bg-gray-300 rounded animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);
