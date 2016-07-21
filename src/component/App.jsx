import React from "react";

var App = React.createClass({
    render() {
        return(
            <div>
                <h2>Templates</h2>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default App;
