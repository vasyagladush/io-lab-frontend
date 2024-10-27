import React, { FC, useEffect, useRef, useState } from "react";
import { AvatarProps, AvatarSizeVariant } from "./Avatar.interface";
import { ArrowDownContained, User } from "../../icons";

export const Avatar: FC<AvatarProps> = ({
  children,
  avatarSrc,
  isOnline,
  size,
  disableDropdown,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const clickOnWindow = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        valueRef.current &&
        !valueRef.current.contains(e.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", clickOnWindow);
    return () => {
      window.removeEventListener("click", clickOnWindow);
    };
  }, []);

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!disableDropdown) setIsMenuOpen(!isMenuOpen);
  };

  // Determine avatar size classes
  const avatarSizeClasses =
    size === AvatarSizeVariant.SMALL
      ? "w-9 h-9"
      : size === AvatarSizeVariant.LARGE
      ? "w-24 h-24"
      : "w-14 h-14";

  // Determine online dot size and position classes
  const onlineDotSizeClasses =
    size === AvatarSizeVariant.SMALL
      ? "w-2 h-2"
      : size === AvatarSizeVariant.LARGE
      ? "w-3.5 h-3.5"
      : "w-2.5 h-2.5";

  const onlineDotPositionClasses =
    size === AvatarSizeVariant.LARGE ? "right-3 bottom-0" : "right-0 bottom-0";

  // Determine icon scale classes
  const iconScale =
    size === AvatarSizeVariant.SMALL
      ? "scale-100"
      : size === AvatarSizeVariant.LARGE
      ? "scale-300"
      : "scale-150";

  return (
    <div ref={ref} className="relative w-fit">
      <div className="flex items-center">
        <div
          className={`relative ${!disableDropdown ? "cursor-pointer" : ""}`}
          onClick={onClickHandler}
        >
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="avatar"
              className={`rounded-full object-cover ${avatarSizeClasses}`}
            />
          ) : (
            <div
              className={`flex items-center justify-center rounded-full bg-gray-400 ${avatarSizeClasses}`}
            >
              <User className={`${iconScale}`} />
            </div>
          )}
          {isOnline && (
            <div
              className={`absolute ${onlineDotSizeClasses} ${onlineDotPositionClasses} border-2 border-white rounded-full bg-green-500`}
            />
          )}
        </div>
        {!disableDropdown && (
          <ArrowDownContained className="ml-1.5 cursor-pointer" />
        )}
      </div>
      {isMenuOpen && (
        <div className="absolute right-0 bg-white border border-gray-200 shadow-md rounded-md mt-2 w-36">
          {children}
        </div>
      )}
    </div>
  );
};
