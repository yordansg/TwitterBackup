import { createBrowserHistory, History } from 'history';

const history = process.env.BROWSER && createBrowserHistory();

export default history as NonNullable<History>;
