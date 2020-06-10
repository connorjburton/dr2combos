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
		this.toggleItemsOnCard = this.toggleItemsOnCard.bind(this);
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

	toggleItemsOnCard(cardItems) {
		const selectedCardItems = this.state.selected.filter((selectedItem) => cardItems.includes(selectedItem));
		selectedCardItems.length > 0 ? selectedCardItems.forEach(this.toggleItem) : cardItems.forEach(this.toggleItem);
	}

	render() {
		return (
			<div id="app" className="">
				<Header />
				<div className={'wrapper'}>
					<Items data={this.state.config.items} toggle={this.toggleItem} selected={this.state.selected} />
					<Cards data={this.state.config.combos} toggleCard={this.toggleItemsOnCard} selected={this.state.selected} />
				</div>
			</div>
		);
	}
}
