import React from "react";

// type of children
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="auth">
    {children}
  </main>;
};

export default Layout;
