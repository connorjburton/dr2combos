import Constants from '../src/constants.js';

describe('Items', () => {
	test('Should not contain items that are not part of combos', () => {
		const uniqueComboItems = Constants.COMBO_CARDS.reduce((aggregate, card) => {
			card.weapons.forEach((weapon) => {
				if (!aggregate.includes(weapon)) {
					aggregate.push(weapon);
				}

				return;
			});

			return aggregate;
		}, []);

		expect(Constants.ITEMS.sort()).toEqual(uniqueComboItems.sort());
	});
});
