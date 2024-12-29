import {
  Book,
  Edit,
  LayoutDashboard,
  LogOut,
  Menu,
  School,
} from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DarkMode from "../DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/app/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <>
      <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 sticky top-0 left-0 right-0 duration-300 z-10 px-4">
        {/* Desktop */}
        <div className="hidden md:flex max-w-7xl mx-auto justify-between items-center gap-10 h-full">
          <Link to="/">
            <div className="flex items-center gap-2">
              <School size={"30"} />
              <Link to="/">
                <h1 className="hidden md:block font-bold text-2xl">LearnHub</h1>
              </Link>
            </div>
          </Link>

          {/* User icon and dark mode icon */}
          <div className="flex item-centers gap-5">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                      <AvatarImage
                        src={user?.photoUrl || "https://github.com/shadcn.png"}
                        alt="User Avatar"
                      />
                      <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-500 text-white">
                        CN
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 p-2 mt-1 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                    <DropdownMenuLabel className="flex items-center text-black justify-center p-2 font-bold">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {user?.role === "student" && (
                        <>
                          <DropdownMenuItem>
                            <div className="flex gap-2 items-center text-black px-1 py-2 cursor-pointer hover:bg-gray-100">
                              <Book />
                              <span>
                                <Link to="/my-learning">My Learning</Link>
                              </span>
                            </div>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuItem>
                        <div className="flex gap-2 items-center text-black px-1 py-2 cursor-pointer hover:bg-gray-100">
                          <Edit />
                          <span>
                            <Link to="/profile">Edit Profile</Link>
                          </span>
                        </div>
                      </DropdownMenuItem>
                      {user?.role === "instructor" && (
                        <>
                          <DropdownMenuItem>
                            <div className="flex gap-2 items-center text-black px-1 py-2 cursor-pointer hover:bg-gray-100">
                              <LayoutDashboard />
                              <span>
                                <Link to="/admin/dashboard">Dashboard</Link>
                              </span>
                            </div>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      <div className="flex gap-2 items-center text-black px-1 py-2 cursor-pointer hover:bg-gray-100">
                        <LogOut />
                        <span>Log Out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button onClick={() => navigate("/login")}>Signup</Button>
                </div>
              </>
            )}
            <DarkMode />
          </div>
        </div>
        {/* Mobile device */}
        <div className="flex md:hidden items-center justify-between px-4 h-full">
          <div className="flex items-center gap-2">
            <School size={"30"} />
            <h1 className="font-bold text-2xl">LearnHub</h1>
          </div>
          <MobileNavbar user={user} />
        </div>
      </div>
    </>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full hover:bg-gray-200"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <SheetTitle>
                <Link to="/">
                  <div className="flex items-center gap-2">
                    <School size={"25"} />
                    <h1 className="font-bold text-xl">LearnHub</h1>
                  </div>
                </Link>
              </SheetTitle>
              <DarkMode />
            </div>
          </SheetHeader>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <Link to="/my-learning">My Learning</Link>
            <Link to="/profile">Edit Profile</Link>
            <p>Log out</p>
          </nav>
          {user?.role === "instructor" && (
            <>
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    type="submit"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Dashboard
                  </Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
