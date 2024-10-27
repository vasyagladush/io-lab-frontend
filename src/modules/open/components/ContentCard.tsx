import { TypographyVariant } from "../../../components/ui-kit";

import { Title } from "../styles";

export interface ContentCardProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[];
  disableEndSession?: boolean;
}

export const ContentCard: React.FunctionComponent<ContentCardProps> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-8">
      <Title variant={TypographyVariant.HEADER1}>{title}</Title>
      {children}
    </div>
  );
};
