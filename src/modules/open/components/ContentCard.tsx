import { Hypertext, TypographyVariant } from "../../../components/ui-kit";
import { NavigationAppRoutes } from "../../../constants/navigation-routes";
import { Title } from "../styles";
import { useUserContext } from "../../../contexts/UserContextProvider";
import Api from "../../../utils/api";

export interface ContentCardProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[];
  disableEndSession?: boolean;
}

export const ContentCard: React.FunctionComponent<ContentCardProps> = ({
  title,
  children,
  disableEndSession,
}) => {
  const { clearUser } = useUserContext();

  const endSession = async () => {
    localStorage.removeItem("accessToken");
    Api.updateHeadersWithToken(null);
    clearUser();
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-8">
      <Title variant={TypographyVariant.HEADER1}>{title}</Title>
      {children}
      {!disableEndSession && (
        <div className="flex justify-center mt-6">
          <Hypertext
            onClick={endSession}
            to={NavigationAppRoutes.Open.Auth.SIGN_IN_START}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Quit
          </Hypertext>
        </div>
      )}
    </div>
  );
};
