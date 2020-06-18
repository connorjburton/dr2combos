import style from './style.css';

const Footer = () => (
    <footer className={style.footer}>
        <div className={style.footerLeft}>
            <span>Created by <a href="https://github.com/connorjburton">Connor</a> &amp; <a href="https://github.com/Jimsalad">James</a></span>
        </div>
        <div className={style.footerCenter} />
        <div className={style.footerRight}>
            <a href="https://github.com/connorjburton/dr2combos">
                <img src="../../assets/github.svg" height="32" width="32" alt="Github Repo" />
            </a>
        </div>
	</footer>
);

export default Footer;
