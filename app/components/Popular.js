import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import {
  FaBeer,
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = [
    "All",
    "Java",
    "Python",
    "Ruby",
    "JavaScript",
    "CSS",
    "GoLang",
    "PHP",
    "Dart"
  ];

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={
              //if the langueage is selected
              language === selected
                ? //be this color
                  { color: "#455B71" }
                : // if not, be this color
                  { color: "#28343D" }
            }
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
          <p>
            {" "}
            <FaBeer />{" "}
          </p>
        </li>
      ))}
    </ul>
  );
}

//-------------- PROPTYPES! --------------//
LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        console.log(`repos[0] >>>> ${repos[0]}`)
        const { login, avatar_url } = owner;

        return (
          <li key={html_url} className="repo bg-light">
            <h4 className="header-lg center-text">#{index + 1}</h4>
            <img
              className="avatar"
              src={avatar_url}
              alt={`avatar for ${login}`}
            />
            <h2 className="center-text">
              <a className="link" href={html_url}>
                {name}
              </a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color="rgb(255, 191, 116)" size={22} />
                <a href={`https://github.com/${login}`}>
                  {login}
                </a>
              </li>
              <li>
              <FaStar color='rgb(255, 215, 0)' size={22} />
              {stargazers_count.toLocaleString()} stars
              </li>
              <li>
              <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
              {forks.toLocaleString()} forks                
              </li>
              <li>
              <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
              {open_issues.toLocaleString()} open issues                  
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

//-------------- PROPTYPES! --------------//
ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      //can derive if still loading from this
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(() => {
          console.warn("error fetching repos D:");

          this.setState({
            error: "there was an error"
          });
        });
    }
    console.log(this.state);
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }
  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {/* "logical operator.." if the left of the "&&" is true, the right side evaluates*/}
        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    );
  }
}

export default Popular;
