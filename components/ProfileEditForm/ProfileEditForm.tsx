"use client";

import { useState, useRef } from "react";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

interface UserData {
  name: string;
  email: string;
  gender: string;
  dueDate: string;
  avatar: string | null;
}

export default function ProfileEditForm() {
  const initialData: UserData = {
    name: "Unknown User",
    email: "user1@gur.mo",
    gender: "",
    dueDate: "",
    avatar: "/Avatar Image.jpg",
  };

  const [formData, setFormData] = useState<UserData>(initialData);
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // При введенні видаляємо помилку
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPhoto = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, avatar: newPhoto }));
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setErrors({});
  };

  const handleSave = () => {
    const newErrors: { name?: boolean; email?: boolean } = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Збережені дані:", formData);
    alert("Зміни збережено!");
  };

  const handleOpenDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="profileContainer">
      <form>
        <ProfileAvatar
          avatar={formData.avatar}
          name={formData.name}
          email={formData.email}
          onUpload={handleUpload}
        />

        {/* Ім’я */}
        <div className="name">
          <span className="user">Ім’я</span>
          <input
            className={`inputUser ${errors.name ? "inputError" : ""}`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Unknown User"
          />
          {errors.name && (
            <p className="errorText">
              Будь ласка, заповніть всі обов&apos;язкові поля!
            </p>
          )}
        </div>

        {/* Пошта */}
        <div className="name">
          <span className="user">Пошта</span>
          <input
            className={`inputUser ${errors.email ? "inputError" : ""}`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user1@gur.mo"
          />
          {errors.email && (
            <p className="errorText">
              Будь ласка, заповніть всі обов&apos;язкові поля!
            </p>
          )}
        </div>

        {/* Стать */}
        <div className="genderOption">
          <label className="name">
            <span className="user">Стать дитини</span>
            <div className="inputWrapper">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="inputSelection"
              >
                <option value="">Оберіть стать</option>
                <option value="boy">Хлопчик</option>
                <option value="girl">Дівчинка</option>
                <option value="not specified">Не вказано стать</option>
              </select>
              <svg className="iconGender">
                <use href="/sprite.svg#arrow_down" />
              </svg>
            </div>
          </label>
        </div>

        {/* Дата пологів */}
        <div className="dateOption">
          <label className="name">
            <span className="user">Планова дата пологів</span>
            <div className="inputWrapper">
              <input
                ref={dateInputRef}
                className="inputUser"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
              <svg className="iconProfile" onClick={handleOpenDatePicker}>
                <use href="/sprite.svg#arrow_down" />
              </svg>
            </div>
          </label>
        </div>

        {/* Кнопки */}
        <div className="buttons">
          <button type="button" className="firstButton" onClick={handleCancel}>
            <span className="textButton">Відмінити зміни</span>
          </button>
          <button type="button" className="lastButton" onClick={handleSave}>
            <span className="textButton">Зберегти зміни</span>
          </button>
        </div>
      </form>
    </div>
  );
}
