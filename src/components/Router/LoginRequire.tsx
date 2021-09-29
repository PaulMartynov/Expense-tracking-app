import React from "react";
import { Redirect } from "react-router-dom";

export function loginRequired<P = unknown>(
  Component: React.ComponentType<P>,
  isRequired: boolean
): React.FC<P> {
  if (isRequired) {
    const WrappedComponent: React.FC<P> = (props) => <Component {...props} />;
    WrappedComponent.displayName = Component.displayName;
    return WrappedComponent;
  }
  return () => (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );
}
export default loginRequired;
