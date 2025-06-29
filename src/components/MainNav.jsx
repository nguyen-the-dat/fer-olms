import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import Logo from "./Logo";
import Avatar from "./Avatar";
import { Button } from "react-bootstrap";

const MainNav = ({ items }) => {
  const [loginSession, setLoginSession] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch("/api/me");
        const data = await response.json();
        setLoggedInUser(data);
        setLoginSession(true); // Giả lập phiên đăng nhập
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    }

    fetchMe();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoginSession(null);
    setLoggedInUser(null);
    // Thêm xử lý logout ở đây nếu cần
  };

  return (
    <>
      <div className="d-flex gap-3 gap-lg-4">
        <Link href="/">
          <Logo />
        </Link>

        {/* menu : features, pricing, blogs, documentation */}
        {items?.length ? (
          <nav className="d-none d-lg-flex gap-3">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className="d-flex align-items-center fs-5 fw-medium text-body text-decoration-none hover-opacity"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {/* {showMobileMenu && items && (
          <MobileNav items={items}> {children} </MobileNav>
        )} */}
      </div>

      <nav className="d-flex align-items-center gap-3">
        {/* drop down menu and avatar */}
        {!loginSession && (
          <div className="d-flex align-items-center gap-3">
            <Link to="/login">
              <button className="btn btn-dark px-3 text-white text-decoration-none">
                Login
              </button>
            </Link>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Register
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/register/student">
                  Student
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/register/instructor">
                  Instructor
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}

        {/* {loginSession && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={loggedInUser?.profilePicture}
                    alt="@ariyan"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-4">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={"/account"}>Profile</Link>
              </DropdownMenuItem>

              {loggedInUser?.role === "instructor" && (
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href={"/dashboard"}>Instructor Dashboard</Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem className="cursor-pointer">
                <Link href={"/account/enrolled-courses"}>My Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href={"#"}>Testimonials & Certificate</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut({
                      callbackUrl: "/",
                    });
                  }}
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )} */}

        {/* <button
          className="flex items-center space-x-2 lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button> */}
      </nav>
    </>
  );
};

export default MainNav;
