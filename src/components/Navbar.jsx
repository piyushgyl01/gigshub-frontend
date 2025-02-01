import { Link } from "react-router";
import { Outlet } from "react-router";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary " data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Gigshub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Job Postings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/post-job">
                  Post a Job
                </Link>
              </li> 
              <li className="nav-item">
                <a
                  className="nav-link"
                  target="_blank"
                  href="https://build-with-piyush-r5h0xnymh-piyush-goyals-projects-72282e7a.vercel.app/"
                >
                  Developer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
