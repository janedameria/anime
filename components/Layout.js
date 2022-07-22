import Navbar from "./Navbar";
import styled from "@emotion/styled";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
