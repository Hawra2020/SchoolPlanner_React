import {
	Switch,
	Route,
	BrowserRouter as Router,
	useHistory,
	Redirect,
} from 'react-router-dom';
import { useReducer } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/index';
import TermsAndConditions from './pages/TermsAndConditions';
import About from './pages/About';
import Update from './pages/Update';
import Dictionaries from './pages/Dictionaries';
import PrivacyPolicy from './pages/PrivacyPolicy';
import {
	initialState as globalInitState,
	reducer as globalReducer,
} from './store/reducers/globalReducer';
import { GlobalContextProvider } from './store/contexts/globalContext';
import './App.css';

function App() {
	const [globalState, globalDispatch] = useReducer(
		globalReducer,
		globalInitState
	);

	return (
		<Router history={useHistory()}>
			<GlobalContextProvider
				value={{ state: globalState, dispatch: globalDispatch }}
			>
				<Switch>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
					<Route path="/home" component={Home} exact />
					<Route
						path="/home/:prevSelectedRoom"
						component={Home}
						exact
					/>
					<Route
						path="/terms-and-conditions"
						exact
						component={TermsAndConditions}
					/>
					<Route path="/about" component={About} exact />
					<Route
						path="/privacy-policy"
						component={PrivacyPolicy}
						exact
					/>
					<Route
						path="/update/:day/:slot/:room/:group"
						component={Update}
						exact
					/>
					<Route
						path="/dictionary/:dictionary"
						component={Dictionaries}
						exact
					/>
				</Switch>
			</GlobalContextProvider>
		</Router>
	);
}

export default App;
