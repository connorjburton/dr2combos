import { Component, Fragment } from 'preact';

import Header from './header';
import Footer from './footer';

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
			<Fragment>
				<div className={'bg'} />
				<div id="app" className="">
					<Header />
					<div className={'wrapper'}>
						<Items 
							data={this.state.config.items} 
							toggle={this.toggleItem} 
							clear={this.clearSelectedItems}
							selected={this.state.selected} 
						/>
						<Cards 
							data={this.state.config.combos}
							toggleCard={this.toggleItemsOnCard}
							selected={this.state.selected}
							/>
					</div>
					<Footer />
				</div>
			</Fragment>
		);
	}
}
