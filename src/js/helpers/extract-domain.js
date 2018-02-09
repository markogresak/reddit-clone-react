import _ from 'lodash';

const urlRe = /:\/\/(.[^/]+)(.*)/;

export default function extractDomain(url = '') {
  return _.get(url.match(urlRe), 1, '');
}
