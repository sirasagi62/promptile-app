import { ComponentPropsWithRef, PropsWithChildren } from "react";

type DivProps = PropsWithChildren<ComponentPropsWithRef<"div">>;

export const HStack = ({ children, className, ...props }: DivProps) => {
  return (
    <div {...props} className={`flex ${className}`}>
      {children}
    </div>
  );
};

export const VStack = ({ children, className, ...props }: DivProps) => {
  return (
    <div {...props} className={`flex flex-col ${className}`}>
      {children}
    </div>
  );
};

export const Rest = ({ children, className, ...props }: DivProps) => {
  return (
    <div {...props} className={`flex grow ${className}`}>
      {children}
    </div>
  );
};

export const HeaderStack = ({ children, className, ...props }: DivProps) => {
  return (
    <div
      {...props}
      className={`flex justify-between items-center ${className}`}
    >
      {children}
    </div>
  );
};

export const HeaderRightBox = ({ children, className, ...props }: DivProps) => {
  return (
    <div {...props} className={`flex ${className}`}>
      {children}
    </div>
  );
};
