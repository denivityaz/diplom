import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PayBtn from "../components/btnPay/PayBtn";
import axios from "axios";
import parse from "html-react-parser";
import Cookies from "js-cookie";
import Modal from "react-modal";
import { useNavigate, Link } from "react-router-dom";
import CourseEdit from "../components/admin/course_edit";

const Project = () => {
  const { id } = useParams();
  const [project, setProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isadmin, setIsAdmin] = useState();
  const [modalAnimationClass, setModalAnimationClass] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [message, setMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (modalIsOpen || editModalIsOpen) {
      setModalAnimationClass("modal--open");
    } else if (modalAnimationClass) {
      setModalAnimationClass("modal--close");
    }
  }, [modalIsOpen, editModalIsOpen]);

  const openModal = () => {
    const token = Cookies.get("token");
    if(token)
    setModalIsOpen(true);
    else
    navigate('/login')
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTimeout(() => {
      setName("");
      setContactMethod("");
      setMessage("");
      setContactError("");
    }, 300); // Длительность анимации
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const isadmin = Cookies.get("isadmin");
        const user_id = Cookies.get("id");
        setUser({ user_id, isadmin });
        const token = Cookies.get("token");
        let config = {
          headers: {
            authorization: token,
          },
        };
        const response = await axios.get(
          "http://185.218.0.16:3333/api/course/" + id,
          config
        );
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response.data);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  const buyProject = async () => {
    const token = Cookies.get("token");
    let config = {
      headers: {
        authorization: token,
      },
    };
    const user_id = Cookies.get("id");
    const data = {
      detail: text,
      user_id: user_id,
      course_id: id,
    };
    console.log(data);
    console.log(token);
    await axios
      .post("http://185.218.0.16:3333/api/purchase", data, config)
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };
  const removeProject = async () => {
    const token = Cookies.get("token");
    let config = {
      headers: {
        authorization: token,
      },
    };
    await axios
      .delete(`http://185.218.0.16:3333/api/course/${id}`, config)
      .then((res) => {
        console.log(res);
        navigate("/projects");
      });
  };
  const toggleEdit = () => {
    setEditModalIsOpen(!editModalIsOpen);
  };
  if (loading) return <div>Загрузка...</div>;
  if (error)
    return (
      <div>
        Ошибка: {error}{" "}
        <div onClick={removeProject} className="btn">
          Удалить
        </div>
      </div>
    );
  return (
    <main className="section_animated">
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={toggleEdit}
        className={`modal ${modalAnimationClass}`}
        overlayClassName="overlay"
        contentLabel="Изменить"
        closeTimeoutMS={300}
      >
          <CourseEdit project={project} />
      </Modal>
      <div className="container">
        <div className="project-details">
          {user.isadmin === "true" && (
            <div className="btn_group">
              <div className="btn" onClick={toggleEdit}>
                Изменить
              </div>
              <div onClick={removeProject} className="btn">
                Удалить
              </div>
            </div>
          )}
          <h1 className="title-1">{project.title}</h1>

          {/* <img
						src={project.imgBig}
						alt={project.title}
						className="project-details__cover"
					/> */}
          <iframe
            src={project.full_path || project.demo_path}
            width="1280"
            height="720"
            className="project-details__cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title={project.title}
            allowFullScreen
          />

          <div className="project-details__desc">
            <h2 className="title-2">Описание</h2>
            {parse(project.description)}
          </div>

          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className={`modal ${modalAnimationClass}`}
              overlayClassName="overlay"
              contentLabel="Форма записи"
              closeTimeoutMS={300}
            >
              <h2 className="title-2">Покупка курса</h2>
              <form
                // onSubmit={handleSubmit}
                className="form"
              >
                <div className="form-group">
                  <p className="modal-p">Название: {project.title}</p>
                  <p className="modal-p">Цена: {project.price}</p>
                </div>
                <div className="form-group">
                  {contactError && (
                    <p className="error-message">{contactError}</p>
                  )}
                </div>
                <div className="form-group">
                  <p className="modal-p">Данные карты:</p>
                  <textarea
                    value={text}
                    onChange={(ev) => setText(ev.target.value)}
                    placeholder="Номер карты СVV"
                    required
                  ></textarea>
                </div>
                <div className="form-buttons">
                  <div onClick={buyProject} className="submit-btn">
                    Купить
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="close-btn"
                  >
                    Закрыть
                  </button>
                </div>
              </form>
            </Modal>
          </div>
          {project.demo_path && (
            <button className="btn" onClick={openModal}>
              Приобрести
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Project;
