import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import GoogleMap from '../components/GoogleMap';
import PostList from '../components/PostList';
import Page from '../components/Page';

export class HomepageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueToggle: "...",
            isGiverPost: 1,
            filteredIds: [],
            breadcrumb: '',
            newCoords: []
        };
        this.handleSearchView = this.handleSearchView.bind(this);

    }

    onClickNewPost() {
        this.props.history.push("/addpost");
    }

    handleChangePostTypeHPView = (postTypeHPView) => {
        this.setState({
            isGiverPost: postTypeHPView
        });

        // window.location.reload();
    }

    handlePlaceSelectHPView = (newCoordsHPView) => {
        this.setState({
            newCoords: newCoordsHPView
        })
    }

    handleSearchView = (filteredIds) => {
        this.setState({
            filteredIds: filteredIds
        });
    }
    render() {
        return (
            <Page isGiverPostHPView={this.handleChangePostTypeHPView} finalFilteredIds={this.handleSearchView} newCoordsHPView={this.handlePlaceSelectHPView}> 
                <Row className="justify-content-center">
                    <Col xs={3}>
                        <Button className="btn-main" size="lg" onClick={this.onClickNewPost.bind(this)}>
                            + POST
                        </Button>
                        <div style={{ height: '100vh', overflowY: 'scroll' }}>
                            <PostList isGiverPost={this.state.isGiverPost} filteredIds={this.state.filteredIds} />
                        </div>

                    </Col>
                    <Col xs={7}>
                        <GoogleMap newCoords={this.state.newCoords} isGiverPost={this.state.isGiverPost} filteredIds={this.state.filteredIds} />
                    </Col>
                </Row>
            </Page>
        )
    }
}