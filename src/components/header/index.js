import style from './style.css';

const Header = () => (
	<header className={style.header}>

		<h1>{'@ ATLAS'.split('').map(letter => <span className={style.clipText}>{letter}</span>)}</h1>
	</header>
);

export default Header;
