import React from 'react';
import './LocationAndDateForm.css';

class LocationAndDateForm extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            date: "",
            postcode: "",
            confirmPostcode: "",
            postCodeMatch: undefined
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
        this.handleConfirmPostcode = this.handleConfirmPostcode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDateChange (e) {
        this.setState({
            date: e.target.value
        }, () => {
            console.log(this.state);
        });
    }

    handlePostcodeChange (e) {
        this.setState({
            postcode: e.target.value.toUpperCase()
        }, () => {
            console.log(this.state);
        });
    }

    handleConfirmPostcode (e) {
        this.setState({
            confirmPostcode: e.target.value.toUpperCase(),
            postCodeMatch: this.state.postcode === e.target.value.toUpperCase()
        }, () => {
            console.log(this.state);
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

    renderPostcodeMatch () {
        return (
            <div className="hint">
                { this.state.postCodeMatch ?
                    <p className="hint__message">Postcodes match.</p> :
                    <p className="hint__message hint__message--warning">Postcode do not match.</p>
                }
            </div>
        )
    }

    renderButton () {
        const { postCodeMatch, date } = this.state;
        const disabledButton = () => {
            return !(postCodeMatch && date.length > 0)
        };
        const classes = () => {
            return disabledButton() ? "footer__button footer__button--disabled" : "footer__button";
        };
        return <button disabled={ disabledButton() } className={ classes() } type="submit">Find</button>
    }

    handleError () {
        return this.props.error === 'NOT_FOUND' ? this.renderInputError() : this.renderServiceError();
    }

    render () {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h2 className="form__header">Search for your sunrise and sunset times</h2>
                <fieldset className="form_fieldset">
                    <div className="field">
                        <label className="field__label" htmlFor="postcode">Postcode</label>
                        <input value={this.state.postcode}
                               required={true}
                               type="text"
                               id="postcode"
                               className="field__input field__input--text"
                               maxLength={8}
                               onChange={this.handlePostcodeChange} />
                    </div>
                    <div className="field">
                        <label className="field__label" htmlFor="postcode">Confirm postcode</label>
                        <input value={this.state.confirmPostcode}
                               required={true}
                               type="text"
                               id="confirmPostcode"
                               className="field__input field__input--text"
                               maxLength={8}
                               onChange={this.handleConfirmPostcode} />
                    </div>
                    { this.state.postcode && this.state.confirmPostcode && this.renderPostcodeMatch() }
                    <div className="field">
                        <label className="field__label" htmlFor="date">Date</label>
                        <input value={this.state.date}
                               required={true}
                               type="date"
                               id="date"
                               className="field__input field__input--date"
                               onChange={this.handleDateChange} />
                    </div>
                </fieldset>
                <footer className="footer">
                    { this.props.error && this.handleError() }
                    { this.renderButton() }
                </footer>
            </form>
        )
    }
}

export default LocationAndDateForm;