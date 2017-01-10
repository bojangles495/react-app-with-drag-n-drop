import React from 'react';
import Loader from 'react-loader-advanced';

export default class Router extends React.Component {
    static displayName = 'Router';
    static propTypes = {
        components: React.PropTypes.object.isRequired,
        extraProps: React.PropTypes.object,
        route: React.PropTypes.string.isRequired,
        routes: React.PropTypes.object.isRequired,
        setRoute: React.PropTypes.func.isRequired,
        hideLoadingScreen: React.PropTypes.func.isRequired,
        showLoadingScreen: React.PropTypes.func.isRequired,
        spinner: React.PropTypes.bool.isRequired
    };
    constructor(props) {
        super(props);
        this.bgStyle = {
            position: "fixed",
            height: "100%",
            width: "100%",
            zIndex: 9999
        };
        this.onPending = this.onPending.bind(this);
        this.onPendingDone = this.onPendingDone.bind(this);
    }

    onPending() {
        this.props.showLoadingScreen();
        return this.props.hideLoadingScreen;
    }

    onPendingDone() {
        this.props.hideLoadingScreen();
    }

    render() {
        const Page = this.props.components[this.props.route];

        if (Page) {
            return (
                <div>
                    <Loader 
                        show={this.props.spinner} 
                        hideContentOnLoad={true} 
                        backgroundStyle={this.bgStyle} 
                        />
                    <Page
                        {...this.props.extraProps}
                        hideLoadingScreen={this.props.hideLoadingScreen}
                        showLoadingScreen={this.props.showLoadingScreen}
                        routes={this.props.routes}
                        setRoute={this.props.setRoute}
                        />
                </div>);
        }
        return null;
    }
}
