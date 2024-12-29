import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/app/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const user = data && data?.user;

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile.");
    }
  }, [error, updateUserData, isSuccess, isError]);
  
  return (
    <>
      <div className="max-w-4xl my-12 mx-auto px-4">
        <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
        {isLoading ? (
          <>
            <ProfileSkeleton />
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4 cursor-pointer">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-500 text-white">
                    CN
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="mb-1">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Name:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user?.name}
                    </span>
                  </h1>
                </div>
                <div className="mb-1">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Email:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user?.email}
                    </span>
                  </h1>
                </div>
                <div className="mb-1">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Role:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user?.role.toUpperCase()}
                    </span>
                  </h1>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mt-2">
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label>Name</label>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label>Profile Photo</label>
                        <Input
                          type="file"
                          onChange={onChangeHandler}
                          accept="image/*"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={updateUserIsLoading}
                        onClick={updateUserHandler}
                      >
                        {updateUserIsLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              <h1 className="font-medium text-lg">
                Courses you're enrolled in
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
                {user?.enrolledCources?.length === 0 ? (
                  <h1>You haven't enrolled yet</h1>
                ) : (
                  user?.enrolledCources.map((course, index) => (
                    <Course course={course} key={course._id} />
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;

const ProfileSkeleton = () => (
  <div>
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      <div className="flex-1">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-3 animate-pulse"
            style={{ width: `${70 + index * 10}%` }}
          ></div>
        ))}
        <div className="w-32 h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
    <div>
      <h1 className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  </div>
);
