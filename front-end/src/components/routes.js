import React, { Component } from 'react'
import { Route } from "react-router-dom"
import Navbar from './Navbar/Navbar'
import CreatePost from './posts/createPost';
import CreateCommunity from './community/CreateCommunity'
import MyCommunity from './community/MyCommunity'
import MyCommunities from './communities/myCommunities'

import Profile from './users/profile'
import { Profiler } from 'react';
import CommunityModeration from './communities/communityModeration';
import UserProfilePage from './users/user-profile';
import CommunitySearch from './community/CommunitySearch';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Navbar} />
                <Route path="/submit/:id" component={CreatePost} />
                <Route exact path="/create-community" component={CreateCommunity} />
                <Route path="/community-home-page" component={MyCommunity} />
                <Route exact path="/create-community/:id" component={CreateCommunity} />
                <Route path="/users/profile-page" component={UserProfilePage} />
                <Route path="/search-community" component={CommunitySearch} />

                <Route path="/profile" component={Profile} />
                <Route path = "/my-communities" component={MyCommunities} />
                <Route path = "/my-communities-mod" component={CommunityModeration} />


            </div>
        )
    }
}
export default Routes;