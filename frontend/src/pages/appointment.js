import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Appointment = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = Cookies.get("token");
        let config = {
          headers: {
            authorization: token,
          },
        };
        const response = await axios.get(
          "http://185.218.0.16:3333/api/appointment/",
          config
        );
        const projects = response.data.sort((a, b) => b.userHave - a.userHave);
        setProjects(projects);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  return (
    <main className="section_animated">
      <div className="container">
        <div className="appointments-list">
          {projects.map((appointment) => (
            <div className="appointment">
              <h3>{appointment.name}</h3>
              <p>Контакт через: {appointment.connect_way}</p>
              <p>Сообщение: {appointment.message}</p>
              <p>
                Создано: {new Date(appointment.created_at).toLocaleString()}
              </p>
              <p>
                {/* Обновлено: {new Date(appointment.updated_at).toLocaleString()} */}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Appointment;
