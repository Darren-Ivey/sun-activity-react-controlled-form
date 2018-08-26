import React from 'react';
import './LocationAndDateForm.css';

class LocationAndDateForm extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            postcode: undefined,
            date: undefined
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDateChange (event) {
        console.log(event.target.value)
        this.setState({
            date: event.target.value
        });
    }

    handlePostcodeChange (event) {
        console.log(event.target.value)
        this.setState({
            postcode: event.target.value
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.getSunActivity(this.state);
    }

    renderInputError () {
        return (
            <div className="error">
                <p className="error__message">
                    Sorry, we can't find a location for that postcode. Please check your postcode is valid or try another.
                </p>
            </div>
        )
    }

    renderServiceError () {
        return (
            <div className="error">
                <p className="error__message">Please try again.</p>
            </div>
        )
    }

    handleError () {
        return this.props.error === 'NOT_FOUND' ? this.renderInputError() : this.renderServiceError();
    }

    render () {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <h2 className="form__header">Search for your sunrise and sunset times</h2>
                <fieldset className="form_fieldset">
                    <div className="field">
                        <label className="field__label" htmlFor="postcode">Postcode</label>
                        <input defaultValue=""
                               required={true}
                               type="text"
                               name="postcode"
                               className="field__input field__input--text"
                               maxLength={8}
                               onChange={this.handlePostcodeChange} />
                    </div>
                    <div className="field">
                        <label className="field__label" htmlFor="date">Date</label>
                        <input defaultValue=""
                               required={true}
                               type="date"
                               name="date"
                               className="field__input field__input--date"
                               onChange={this.handleDateChange} />
                    </div>
                </fieldset>
                <footer className="footer">
                    { this.props.error && this.handleError() }
                    <button className="footer__button" type="submit">Find</button>
                </footer>
            </form>
        )
    }
}

export default LocationAndDateForm;