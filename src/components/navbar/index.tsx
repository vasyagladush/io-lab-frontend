import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationAppRoutes } from "../../constants/navigation-routes";
import { useUserContext } from "../../contexts/UserContextProvider";
import { SignOut } from "../icons";
import { Avatar, AvatarSizeVariant } from "../ui-kit";
import { MenuItem } from "../ui-kit/avatar/Menu";
import { BurgerMenu } from "./burger-menu/BurgerMenu";
import { BurgerMenuItem } from "./burger-menu/BurgerMenuItem";
import Api from "../../utils/api";
import { Button } from "flowbite-react";
import { useAdminAccessCheck } from "../../modules/private/hooks/useAdminAccessCheck";
import { use } from "framer-motion/client";
import { useGetUser } from "../../hooks/useGetUser";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="fixed top-0 left-0 w-[calc(100vw-50px)] z-30 flex items-center h-26 bg-white shadow-md p-6">
    {children}
  </div>
);

const RightContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-row ml-auto">{children}</div>
);

const ProfileWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-2.5 sm:flex">{children}</div>
);

const SignOutIcon = () => <SignOut className="transform scale-70" />;

// const StyledDropdown = ({ children }) => (
//   <Dropdown>
//     {children}
//   </Dropdown>
// );

const Navbar: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { clearUser } = useUserContext();
  const { checkAdminAccess } = useAdminAccessCheck();
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(isAdmin);
    checkAdminAccess().then((res) => {
      setIsAdmin(res ?? false);
    });
  }, []);
  // const settingsNavigate = () => {
  //   navigate(NavigationAppRoutes.Private.Settings.USERS);
  // };

  // const profileNavigate = () => {
  //   navigate(NavigationAppRoutes.Private.Profile.PROFILE_SETTINGS);
  // };

  const handleLogOut = async () => {
    localStorage.removeItem("accessToken");
    Api.updateHeadersWithToken(null);
    clearUser();
    navigate(NavigationAppRoutes.Open.Auth.SIGN_IN_START);
  };

  // const navigateToRoute =
  //   (routeName?: string) => (event: React.MouseEvent<HTMLElement>) => {
  //     navigate(routeName ?? "");
  //   };

  // return (
  //   <Wrapper>
  //     {/* <StyledLogo onClick={goToAccessPoints} /> */}
  //     <RightContainer>
  //       (
  //         <>
  //           <BurgerMenu>
  //             {/* {
  //               <>
  //                 <BurgerMenuItem
  //                   icon={<AccessPoint />}
  //                   label="Access points"
  //                   isActive={window.location.pathname.includes(
  //                     "/private/access-points"
  //                   )}
  //                   onClick={navigateToRoute(
  //                     NavigationAppRoutes.Private.AccessPoints.AP_LIST
  //                   )}
  //                 />
  //               </>
  //             } */}

  //             <BurgerMenuItem
  //               label="Sign-out"
  //               icon={<SignOutIcon />}
  //               lastItem
  //               onClick={handleLogOut}
  //             />
  //           </BurgerMenu>
  //           <ProfileWrapper>
  //             {/* {checkAdminAccess() && (
  //               <SettingsButton onClick={settingsNavigate} />
  //             )} */}
  //             <Avatar
  //               size={AvatarSizeVariant.SMALL}
  //               avatarSrc={undefined}
  //               isOnline
  //             >
  //               {/* <MenuItem onClick={profileNavigate}>Profile</MenuItem> */}
  //               <MenuItem onClick={handleLogOut}>Log out</MenuItem>
  //             </Avatar>
  //           </ProfileWrapper>
  //         </>
  //       )
  //     </RightContainer>
  //   </Wrapper>
  // );

  return (
    <div className="fixed top-4 right-4">
      <div className="flex justify-center space-x-4">
        {isAdmin ? (
          location.pathname.includes("admin") ? (
            <Button
              color="green"
              onClick={() =>
                navigate(NavigationAppRoutes.Private.Surveys.INDEX)
              }
            >
              Grade surveys
            </Button>
          ) : (
            <Button
              color="blue"
              onClick={() => navigate(NavigationAppRoutes.Private.Admin.INDEX)}
            >
              Admin panel
            </Button>
          )
        ) : null}

        {isAdmin ? (
          location.pathname.includes("admin") &&
          location.pathname.includes("admin/surveys/add") ? (
            <Button
              color="blue"
              onClick={() =>
                navigate(NavigationAppRoutes.Private.Admin.Surveys.INDEX)
              }
            >
              Surveys list
            </Button>
          ) : (
            <Button
              color="blue"
              onClick={() =>
                navigate(NavigationAppRoutes.Private.Admin.Surveys.CREATE)
              }
            >
              Create a survey
            </Button>
          )
        ) : null}
        <Button color="failure" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
