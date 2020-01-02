import React from "react";
import PropTypes from 'prop-types';

function LanguagesNav({ selected, onUpdateLanguage }) {
    const languages = ["All", "Java", "Python", "Ruby", "JavaScript", "CSS", "GoLang", "PHP", "Dart"];

    return (
      <ul className="flex-center">
        {languages.map(language => (
          <li key={language}>
            <button
              className="btn-clear nav-link"
              style = {language === selected ? {color: '#455B71'} : {color: '#28343D'}}
              onClick={() => onUpdateLanguage(language)}
            >
              {language}
            </button>
          </li>
         ))}
      </ul>
    );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All"
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
    console.log(`You have selected ${selectedLanguage}`)
    // alert("Pay the Troll Toll");
  }

  render() {
    const { selectedLanguage } = this.state

    return (
        <>
        <LanguagesNav 
        selected = {selectedLanguage}
        onUpdateLanguage = {this.updateLanguage}
        />
        </>
    )
  }
}

export default Popular;