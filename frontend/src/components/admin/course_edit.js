import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddButton, EditButton } from "./buttons/buttons";
import Cookies from "js-cookie";

const CourseEdit = ({ project }) => {
  console.log(project);
  // State для хранения значений полей формы
  const [courseData, setCourseData] = useState({
    title: "",
    price: "",
    description: "",
    demo_path: "",
    full_path: "",
    img_path: "",
    category_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (project)
      setCourseData({
        title: project.title,
        price: project.price,
        description: project.description,
        demo_path: project.demo_path,
        full_path: project.full_path,
        img_path: project.img_path,
        category_id: project.category_id,
      });
  }, [project]);
  // Обработчик изменения значений полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  // Обработчик отправки формы
  const handleAdd = async () => {
    setLoading(true);
    if (!project)
      try {
        const response = await axios.post(
          "http://185.218.0.16:3333/api/course/",
          courseData,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: Cookies.get("token"),
            },
          }
        );
        setLoading(false);
        setDone(true)
        setTimeout(() => {
          setDone(false)
        }, 2000);
        setCourseData({
          title: "",
          price: "",
          description: "",
          demo_path: "",
          full_path: "",
          img_path: "",
          category_id: "",
        });
        console.log("Course added successfully:", response.data);
      } catch (error) {
        console.error("Error adding course:", error);
        setError(error.response.data);
      }
    else
      try {
        const response = await axios.put(
          `http://185.218.0.16:3333/api/course/${project.id}`,
          courseData,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: Cookies.get("token"),
            },
          }
        );
        setLoading(false);
        window.location.reload();
        console.log("Course added successfully:", response.data);
      } catch (error) {
        console.error("Error adding course:", error);
        setError(error.response.data);
      }
  };
  if (loading) return <div>Загрузка...</div>;
  if (done)
    return (
      <main className="section_animated">
        <div className="container">
          <h2 className="title-1">Вы успешно добавили курс</h2>
        </div>
      </main>
    );
  if (error) return <div>Ошибка: {error}</div>;
  return (
    <main className="section_animated">
      <div className="container">
        <h2 className="title-1">Добавить курс</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="content-list__item">
            <label className="title-2">Название курса:</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="content-list__item">
            <label className="title-2">Цена:</label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="content-list__item">
            <label className="title-2">Описание:</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="content-list__item">
            <label>Ссылка на демо:</label>
            <input
              type="text"
              name="demo_path"
              value={courseData.demo_path}
              onChange={handleInputChange}
            />
          </div>
          <div className="content-list__item">
            <label className="title-2">Ссылка на полный курс:</label>
            <input
              type="text"
              name="full_path"
              value={courseData.full_path}
              onChange={handleInputChange}
            />
          </div>
          <div className="content-list__item">
            <label className="title-2">Ссылка на изображение:</label>
            <input
              type="text"
              name="img_path"
              value={courseData.img_path}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="title-2">ID категории:</label>
            <input
              type="number"
              name="category_id"
              value={courseData.category_id}
              onChange={handleInputChange}
            />
          </div>
          {!project && <AddButton onClick={handleAdd} />}
          {project && <EditButton onClick={handleAdd} />}
        </form>
      </div>
    </main>
  );
};

export default CourseEdit;
