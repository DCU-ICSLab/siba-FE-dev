import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants';
import { parse } from 'query-string'
import axios from 'axios';

class OAuth2RedirectHandler extends Component {

    render() {

        const queryString = parse(this.props.location.search);
        let token = null;
        let error = null;

        if(queryString)
            if(queryString.token){
                token = queryString.token

                if(token){
                    axios.defaults.headers.common.Authorization ='Bearer '+token;
                }
                else{
                    delete axios.defaults.headers.Authorization;
                }
            }
            else
                error = queryString.error

        //토큰 값이 존재 한다면
        if(token){
            localStorage.setItem(ACCESS_TOKEN, token)
            return <Redirect to="/main"/>
        }
        else{ //error라면
            return <Redirect to="/"/>
        }
    }
}

export default OAuth2RedirectHandler;