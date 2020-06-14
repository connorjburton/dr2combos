
import 'preact/debug';
import { Component } from 'preact';
import Header from './header';

// Code-splitting is automated for routes
import ComboCards from './comboCards';
import Map from './map';
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
		this.clearSelectedItems = this.clearSelectedItems.bind(this);
	}

	clearSelectedItems() {
		this.setState({ selected: [] });
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
		const currentSelectedItems = [...this.state.selected];
		if(currentSelectedItems.length > 0) {
			return currentSelectedItems.forEach(this.toggleItem);
		}
		
		const otherComboCards = this.state.config.combos.filter((combo) => combo.items.some(item => cardItems.includes(item) && !combo.items.every(item => cardItems.includes(item))));
		const allRelevantComboItems = otherComboCards.reduce((cardItemsList, combo) => [...combo.items, ...cardItemsList], cardItems);
		allRelevantComboItems.filter((item, index, allItems) => allItems.indexOf(item) === index).forEach(this.toggleItem);
	}

	render() {
		return (
			<div id="app">
				<Header />
					<Map />
					<div className="overlay-wrapper">
						<ComboCards 
							data={this.state.config.items} 
							toggle={this.toggleItem} 
							toggleCard={this.toggleItemsOnCard}
							clear={this.clearSelectedItems}
							selected={this.state.selected} 
						/>
					</div>
				</div>
		);
	}
}
