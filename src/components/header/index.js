import style from './style.css';

const Header = () => (
	<header className={style.header}>
		<h1>{'DEADRISING ATLAS'.split('').map(letter => <span className={style.clipText}>{letter}</span>)}</h1>
	</header>
);

export default Header;
