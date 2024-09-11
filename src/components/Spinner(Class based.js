/*
    This is Class based Approach.
    You can either use function based (which is used in the app) or this. Both works.
*/

import React, { Component } from 'react'
import loading from "./loading.gif"

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loading} alt="loading" />
            </div>
        )
    }
}

export default Spinner
