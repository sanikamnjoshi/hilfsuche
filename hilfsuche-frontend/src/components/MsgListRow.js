import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { SimpleLink } from './SimpleLink';

export class MsgListRow extends Component {
  render() {
    if(!this.props.msg.title) {
      return (<div></div>)
    }
    else {
      return (
        <a className="post-list-row-container" href={`#/showmessage/${this.props.msg._id}`}>
          <Card style={{ height: '33%%', width: 'auto' }}>
            <Card.Body>
              <Card.Title>
                <h4>{this.props.msg.title}</h4>
              </Card.Title>
              
              <Card.Text>
                <div>{this.props.msg.content}</div>
              </Card.Text>

              <Card.Link>
              </Card.Link>

            </Card.Body>
          </Card>
        </a>
      );
    }
  }
}