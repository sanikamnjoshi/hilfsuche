import React from 'react';
import { Modal, Button } from 'react-bootstrap';


/**
 * Page.js
 * This is the basic common container for Popup page: for instance Login, Register, Add Post,
 *
 * includes:
 * - Header
 * - Content: which will be replaced
 * - Footer (@TODO)
 */


export default class PopupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            show: true      // test
        }
    }

    componentDidMount(){
        this.setState({
            title: document.title
        });
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        )
    }
}