import React from 'react';

import Navigation from './Navigation';
// import { Footer } from './Footer';
import { Container, Row, Col } from 'react-bootstrap';
import { MyBreadcrumb } from './MyBreadcrumb';


/**
 * Page.js
 * This is the basic common container for each page
 *
 * includes:
 * - Header
 * - Content: which will be replaced
 * - Footer (@TODO)
 */

export default class Page extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isGiverPost: '',
      filteredIds: [],
      breadcrumb: '',
      newCoords: []
    }
  }

  componentDidMount() {
    this.setState({
      title: document.title
    });
  }

  handleChangePostTypePage = (postTypePage) => {
    this.setState({
      isGiverPost: postTypePage
    });

    this.props.isGiverPostHPView(postTypePage);
  }

  handleSearchResultsPage = (filteredIds) => {
    this.setState({
      filteredIds: filteredIds
    });

    this.props.finalFilteredIds(filteredIds);
  }


  handlePlaceSelectPage = (newCoordsPage) => {
    this.setState({
      newCoords: newCoordsPage
    })

    this.props.newCoordsHPView(newCoordsPage)
  }

  render() {
    return (
      <section>
        {/* taking bool value of isGiverPost from the Navigation and calling the function
                (onChangePostType) which sets this value in Page component's state*/}
        <Navigation isGiverPostPage={this.handleChangePostTypePage} newCoordsPage={this.handlePlaceSelectPage} filteredIdsPage={this.handleSearchResultsPage} />
        
        <Container fluid={true}>
            {this.props.children}
        </Container>

      </section>
    );
  }
}