import { FC, useMemo, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { BurgerCrossIcon, BurgerMenuIcon } from "../../icons";
import { useLocation } from "react-router-dom";

interface BurgerMenuProps {
  children?: JSX.Element | JSX.Element[];
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useMemo(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="hidden md:flex">
      <Menu
        isOpen={isOpen}
        right
        styles={{
          bmBurgerButton: {
            position: `absolute`,
            width: `32px`,
            height: `32px`,
            right: `16px`,
            top: `22px`,
            borderRadius: "50%",
            backgroundColor: "#6CB155",
          },
          bmBurgerBars: {
            width: `14px`,
            height: `12px`,
            background: `red`,
          },
          bmBurgerBarsHover: {
            background: `#a90000`,
          },
          bmCrossButton: {
            right: `16px`,
            top: `22px`,
            height: `32px`,
            width: `32px`,
          },
          bmCross: {
            background: `#6CB155`,
            borderRadius: "50%",
          },
          bmMenuWrap: {
            position: `fixed`,
            height: `100%`,
            top: "0",
          },
          bmMenu: {
            background: `#f4f7f9`,
            padding: `1rem`,
            zIndex: "99",
            height: `100vh`,
          },
          bmMorphShape: {
            fill: `#373a47`,
          },
          bmItemList: {
            color: `#f4f7f9`,
            padding: `0 1rem`,
            height: `calc(100% - 1.5rem * 2)`,
            display: `flex`,
            flexDirection: `column`,
            marginTop: "3rem",
          },
          bmOverlay: {
            background: `rgba(0, 0, 0, 0.664)`,
            right: "0",
            top: "0",
            backdropFilter: `blur(4px)`,
          },
        } as any}
        onStateChange={(state: any) => {
          setIsOpen(state.isOpen);
        }}
        customCrossIcon={<BurgerCrossIcon />}
        customBurgerIcon={<BurgerMenuIcon />}
        width="100vw"
      >
        {children}
      </Menu>
    </div>
  );
};
