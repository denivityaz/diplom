import React from 'react';
import { AddButton, EditButton, DeleteButton } from './buttons/buttons'; 


const course_edit = () => {
  const handleAdd = () => {
    // Обработчик для кнопки "Добавить"
    console.log('Добавить');
  };

  const handleEdit = () => {
    // Обработчик для кнопки "Редактировать"
    console.log('Редактировать');
  };

  const handleDelete = () => {
    // Обработчик для кнопки "Удалить"
    console.log('Удалить');
  };

  return (
    <div className="">
      <AddButton onClick={handleAdd} />
      <EditButton onClick={handleEdit} />
      <DeleteButton onClick={handleDelete} />
    </div>
  );
};

export default course_edit;
 