import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavigationAppRoutes } from "../../constants/navigation-routes";
import Navbar from "../navbar";
import { useUserContext } from "../../contexts/UserContextProvider";
import { LoadingBlock } from "../loading-block/LoadingBlock";
import { useGetUser } from "../../hooks/useGetUser";

// interface DivProps {
//   hasNoAccess?: boolean;
//   id: string;
//   children: ReactNode;
// }

// const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
//   return <div className="flex flex-col h-screen">{children}</div>;
// };

// const SideMenuAndContent: FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   return <div className="flex h-[calc(100vh-76px)] mt-[76px]">{children}</div>;
// };

// const Div: FC<DivProps> = ({ hasNoAccess, children }) => {
//   return (
//     <div
//       className={`relative bg-gray-100 flex-1 ${
//         hasNoAccess ? "overflow-hidden" : "overflow-auto"
//       }`}
//     >
//       {children}
//     </div>
//   );
// };

// const Content: FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <div className="flex-1 bg-gray-100 p-8 sm:p-4 sm:pt-4 overflow-y-auto md:overflow-y-visible md:py-6">
//       {children}
//     </div>
//   );
// };

export const PrivateLayout = () => {
  const { loading } = useGetUser();
  const { getUser } = useUserContext();
  const navigate = useNavigate();

  const asyncCheck = async () => {
    const user = await getUser();
    if (!user) {
      navigate(NavigationAppRoutes.Open.Auth.SIGN_IN_START);
    }
  };

  useEffect(() => {
    asyncCheck();
  }, []);

  // Note: no side menu in the current implementation

  // return (
  //   // <Wrapper>
  //   //   <Header />
  //     <LoadingBlock loading={loading}>
  //       {/* <SideMenuAndContent> */}
  //         {/* <Div id="scrollableDiv"> */}
  //           {/* <Content> */}
  //             <Outlet />
  //           {/* </Content> */}
  //         {/* </Div> */}
  //       {/* </SideMenuAndContent> */}
  //     </LoadingBlock>
  //   // </Wrapper>
  // );

  return (
    <>
      <LoadingBlock loading={loading}>
        <Navbar />
        <div className="mt-24 flex justify-center items-center">
          <Outlet />
        </div>
      </LoadingBlock>
    </>
  );
};
