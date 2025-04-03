import logoImg from "../../assets/BT_skull_logo.png";
import "./Header.modules.css";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="" />
        <h1>MechBuilder v0.1</h1>
      </div>
    </header>
  );
}
