import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.config";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="Profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full mt-4"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm text-center">
          {imageError ? (
            <span className="text-red-700 leading-6">
              Error Uploading Image <br /> (Must Be a Image & Image Size Must Be
              Less Than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-red-700">{`Uploading image... ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image Uploaded Succesfully </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="bg-slate-100 p-3"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="bg-slate-100 p-3"
          defaultValue={currentUser.email}
        />
        <input
          type="passowrd"
          name="password"
          placeholder="Password"
          className="bg-slate-100 p-3"
        />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase border-2  border-slate-700 hover:bg-transparent hover:text-slate-700 duration-300">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
