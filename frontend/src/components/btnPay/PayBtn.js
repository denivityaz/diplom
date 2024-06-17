import wallet from './wallet.svg';
import "./style.css"

const PayBtn = ({ link }) => {
	return (
		<a className="btn-pay" href={link} target="_blank" rel="noreferrer" >
			<img src={wallet} alt="" />
			Приобрести
		</a>
	);
};

export default PayBtn;