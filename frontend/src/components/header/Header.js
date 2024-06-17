import "./style.css";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
		<header className="header">
			<div className="header__wrapper">
				<h1 className="header__title">
					<strong>
						Привет, я <em>Елена</em>
					</strong>
					<br />психотерапевт
				</h1>
				<div className="header__text">
					<p>с большим опытом и знаниями.</p>
				</div>
				<Link to="/contacts" className="btn">
                    Попасть ко мне
                </Link>
			</div>
		</header>
	);
}

export default Header;