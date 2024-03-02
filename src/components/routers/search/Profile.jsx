import { useEffect, useState } from "react";
import { api } from "../../../../auth/auth";

const Profile = ({ id }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    hendleImage();
  }, []);
  const hendleImage = async () => {
    const { data } = await api.post("/Images/user", {
      fk_user: id,
    });
    setImages(data[0]);
  };

  return (
    <div className="container-profile">
      {
        <div>
          {images?.nome == "" || images?.nome === undefined ? (
            <img src={`../../public/image/emptyImage.jpg`} className="foto" />
          ) : (
            <img
              src={`http://localhost:3001/files/users/${images?.nome}`}
              className="foto"
            />
          )}
        </div>
      }
    </div>
  );
};

export default Profile;
