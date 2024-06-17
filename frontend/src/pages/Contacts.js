import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const Contacts = () => {

    const handleCopyToClipboard = (event) => {
        event.preventDefault();
        const text = event.target.textContent;
        navigator.clipboard.writeText(text)
    };

    return (
		<main className="section_contact">
			<div className="container">
				<h1 className="title-1">Контакты</h1>

				<ul className="content-list">
					<li className="content-list__item">
						<h2 className="title-2">Telegram / WhatsApp</h2>
						<p>
							<a href="tel:+79051234567" onClick={handleCopyToClipboard}> +7(953)148-66-47</a>
						</p>
					</li>
					<li className="content-list__item">
						<h2 className="title-2">Email</h2>
						<p>
							<a href="mailto:e.rakova@mail.ru" onClick={handleCopyToClipboard}>
							e.rakova@mail.ru
							</a>
						</p>
					</li>
					<li className="content-list__item">
						<h2 className="title-2">Локация</h2>
						<div className="container">
						<p>
							<a href="#!" onClick={handleCopyToClipboard}>Санкт-Петербург,<br />Трамвайный проспект, дом 12, корпус 2</a>
						</p>
						</div>
						<YMaps>
						<div style={{  marginTop:"30px", width: '400px', height: '300px' }}>
                                <Map
                                    defaultState={{
                                        center: [59.855548, 30.264188],
                                        zoom: 13,
                                        controls: ["zoomControl", "fullscreenControl"],
                                    }}
                                    modules={["control.ZoomControl", "control.FullscreenControl"]}
                                    width="100%"
                                    height="100%">
                                    <Placemark defaultGeometry={[59.855548, 30.264188]} />
                                </Map>
                            </div>
  						</YMaps>
					</li>
				</ul>
			</div>
		</main>
	);
}

export default Contacts;