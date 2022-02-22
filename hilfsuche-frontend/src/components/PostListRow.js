import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { SimpleLink } from './SimpleLink';

export class PostListRow extends Component {
  render() {
    if(!this.props.post.title) {
      return (<div></div>)
    }
    else {

      if(this.props.post.isFullfilled) {
        return (
          <a className="post-list-row-container post-fulfilled" href={`#/show/${this.props.post._id}`}>
            <Card style={{ height: '33%%', width: 'auto' }}>
              <Card.Body>
                <Card.Title>
                  <h4>{this.props.post.title}</h4>
                </Card.Title>
  
                <Card.Subtitle className="mb-2 text-muted">
                  <div>{this.props.post.locationName}</div>
                </Card.Subtitle>
                
                <Card.Text>
                  <div>{this.props.post.content}</div>
                </Card.Text>
  
                <Card.Link>
                </Card.Link>
              </Card.Body>
            </Card>
          </a>
        );
      } else {
        return (
          <a className="post-list-row-container post-active" href={`#/show/${this.props.post._id}`}>
            <Card style={{ height: '33%%', width: 'auto' }}>
              <Card.Body>
                <Card.Title>
                  <h4>{this.props.post.title}</h4>
                </Card.Title>
  
                <Card.Subtitle className="mb-2 text-muted">
                  <div>{this.props.post.locationName}</div>
                </Card.Subtitle>
                
                <Card.Text>
                  <div>{this.props.post.content}</div>
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
}

/**
 * put this in DetailView: 
 * Pre-condition: make sure current user is the autor
 *               <SimpleLink to={`/editpost/${this.props.post._id}`}>Edit</SimpleLink> 
 */