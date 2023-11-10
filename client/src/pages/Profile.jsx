import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5">
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full mt-4"
        />
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
