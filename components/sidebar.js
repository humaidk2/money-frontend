import Link from "next/link";
import * as actions from "../actions/auth";
import { connect } from "react-redux";
import { GoogleLogout } from "react-google-login";
import { AvatarGenerator } from "./randomOptionsGenerator";
import Avatar from "avataaars";
const Sidebar = ({ username, logout, logoutGoogle, isGoogleLoggedIn }) => {
  const generator = new AvatarGenerator();
  const options = generator.generateRandomOptions(username);
  options.displayingImg = true;
  const onLogout = (evt) => {
    evt.preventDefault();
    logout();
  };
  const onGoogleLogout = () => {
    logoutGoogle(logout);
  };
  return (
    <ul className="sidebar-nav" data-toggle="collapse">
      <li className="sidebar-brand">
        <a href="#">Money.io</a>
      </li>
      <li className="profile-pic">
        <Avatar
          style={{ width: "124px" }}
          className="profilepic"
          {...options}
        />
      </li>
      <li>
        <p className="username">{username}</p>
      </li>
      <li>
        <Link href="/transactions">
          <a>Transactions</a>
        </Link>
      </li>
      <li>
        <Link href="/debts">
          <a>Owes/Debts</a>
        </Link>
      </li>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <li>
        {isGoogleLoggedIn ? (
          <GoogleLogout
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onGoogleLogout}
          ></GoogleLogout>
        ) : (
          <button href="logout" onClick={onLogout}>
            Sign Out
          </button>
        )}
      </li>
    </ul>
  );
};
const mapStateToProps = (state) => ({
  username: state.isLoggedIn,
  isGoogleLoggedIn: state.isGoogleLoggedIn,
});

export default connect(mapStateToProps, actions)(Sidebar);
