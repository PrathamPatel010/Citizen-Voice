import React, { Component } from 'react';
import QRReader from 'react-qr-scanner';
import FeedbackForm from './FeedbackForm';

class QRContainerClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null, // Initialize 'result' to null
        };
        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(result) {
        this.setState({
            result: result,
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.state.result ? (
                        <FeedbackForm result={this.state.result} />
                    ) : (
                        <QRReader onScan={this.handleScan} delay={100} />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default QRContainerClass;
