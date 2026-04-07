import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import BottomNav from "./BottomNav";
import "./Layout.scss";

const Layout = () => (
  <>
    <header>
      <Container>
        <div className="row">
          <div className="col-12">
            <div className="wrap-header">
              <div className="logo">
                <Link to="/">whoismari.dev</Link>
              </div>
              <div>
                <MainNav />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
    <BottomNav />
  </>
);

export default Layout;
