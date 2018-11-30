import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

import mirrors from './myMirrors';

import topMirrors from './topMirrors';

import events from './events';

import dockerHub from './dockerHub';


// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('/api/projects?name=default').reply(200, mirrors);

mock.onGet('/api/projects?name=library').reply(200,dockerHub);

mock.onGet('/apis/v1/cluster/images/top?count=8').reply(200,topMirrors)

mock.onGet('/apis/v1/cluster/events?limit=500').reply(200,events)