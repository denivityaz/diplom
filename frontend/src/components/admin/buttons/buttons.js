import React from 'react';
import './ButtonStyles.css'; // Импортируем файл стилей

const AddButton = ({ onClick }) => (
  <button className="button add-button" onClick={onClick}>
    Добавить
  </button>
);

const EditButton = ({ onClick }) => (
  <button className="button edit-button" onClick={onClick}>
    Редактировать
  </button>
);

const DeleteButton = ({ onClick }) => (
  <button className="button delete-button" onClick={onClick}>
    Удалить
  </button>
);

export { AddButton, EditButton, DeleteButton };
