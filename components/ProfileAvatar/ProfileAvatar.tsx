"use client";

import Image from "next/image";

interface ProfileAvatarProps {
  avatar: string | null;
  name: string;
  email: string;
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileAvatar({
  avatar,
  name,
  email,
  onUpload,
}: ProfileAvatarProps) {
  return (
    <div  className="avatarContainer" style={{ marginBottom: "32px", textAlign: "center" }}>
      {avatar ? (
        <div
          style={{
            width: "132px",
            height: "132px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "inline-block",
          }}
        >
          <Image
            src={avatar}
            alt="User avatar"
            width={132}
            height={132}
            priority
            style={{
              objectFit: "cover",
              width: "100%", // автоматично підлаштовується
              height: "100%", // автоматично підлаштовується
            }}
            className="profileAvatar"
          />
        </div>
      ) : (
        <div
          style={{
            width: "132px",
            height: "132px",
            borderRadius: "50%",
            backgroundColor: "#ccc",
            display: "inline-block",
          }}
        />
      )}
      <div className="avatarContainerText">
      <p className="userName">{name}</p>
      <p className="userEmail">{email}</p>

      {onUpload && (
        <label
          className="loadButton"
          
        >
          Завантажити нове фото
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            style={{ display: "none" }}
          />
        </label>
        )}
        </div>
    </div>
  );
}
