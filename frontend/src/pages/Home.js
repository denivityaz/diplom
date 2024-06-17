import Header from './../components/header/Header'

const Home = () => {
    return (
		<>
			<Header />
			<main className="section"
			 >
				<div className="container">
					<ul className="content-list">
						<li className="content-list__item">
							<h2 className="title-2">Обо мне</h2>
							<p>
							Я – дипломированный гештальт-терапевт с присвоенной квалификацией, 
							соответствующей международной квалификации Gestalt — practician. 
							Практикую в направлении гештальт-терапия, которое позволяет проработать самые глубокие травмы и переживания, 
							а также ведет к личностному росту, познанию себя.
							</p>
						</li>

						<li className="content-list__item">
							<h2 className="title-2">Backend</h2>
							<p>NodeJS, MySQL, MongoDB, PHP, Laravel</p>
						</li>
					</ul>
				</div>
			</main>
		</>
	);
}

export default Home;