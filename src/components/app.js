import { Component } from 'preact';

import Header from './header';

// Code-splitting is automated for routes
import Cards from './cards';
import Items from './items';
import constants from '../constants';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			config: {
				items: constants.ITEMS,
				combos: constants.COMBO_CARDS,
			},
			selected: []
		};

		this.toggleItem = this.toggleItem.bind(this);
	}

	toggleItem(item) {
		this.setState(({ selected }) => {
			const index = selected.indexOf(item);
			if (index > -1) {
				selected.splice(index, 1);
				return { selected };
			}

			selected.push(item);
			return { selected };
		})
	}

	render() {
		return (
			<div id="app">
				<Header />
				<div className={'wrapper'}>
					<Items data={this.state.config.items} toggle={this.toggleItem} selected={this.state.selected} />
					<Cards data={this.state.config.combos} selected={this.state.selected} />
				</div>
			</div>
		);
	}
}
