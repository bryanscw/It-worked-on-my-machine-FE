import React, { Component } from 'react';
import { Button, CssBaseline, TextField, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { authenticateLogin } from '../../../redux/ducks/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MazematicsIcon from './mazematicsIcon.png';
import PokemonIcon from './pokemonIcon.png';

const styles = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 120%',
        backgroundImage:
            'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)'
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
    },
    avatar: {
        margin: theme.spacing(1),
        maxWidth: 50
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#00C187",
        outline: 0,
        '&:hover': {
            backgroundColor: '#01AC79',
        },
        '&:active': {
            backgroundColor: '#01AC79',
        },
        '&:focus': {
            outline: 0
        },
    },
    icon: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '30%',
        margin: 'auto'
    }
});

/**
 * This component displays the loginpage for user.
 */
class LoginPage extends Component {
    state = {
        username: '',
        password: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.authenticateLogin(this.state);
    }

    render() {
        const {
            username,
            password,
        } = this.state;

        const {
            classes,
        } = this.props;

        return (
            <div className={classes.main} data-test="loginContainer">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <img src={MazematicsIcon} className={classes.icon} alt="Mazematic Icon" />
                    <div className={classes.paper}>
                        <img src={PokemonIcon} className={classes.avatar} alt="Pokemon Icon" />
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                data-testid = "usernameField"
                                onChange={this.handleChange}
                                defaultValue={username}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                data-testid = "passwordField"
                                onChange={this.handleChange}
                                defaultValue={password}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                data-testid = "loginButton"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }

}

LoginPage.propTypes = {
    /** An action creator for authenticating login */
    authenticateLogin: PropTypes.func.isRequired,
    /** An object used for styling */
    classes: PropTypes.object.isRequired,
};

const dispatchers = {
    authenticateLogin
};

export default connect(() => ({}), dispatchers)(withStyles(styles)(LoginPage));
