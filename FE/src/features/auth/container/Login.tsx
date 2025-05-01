import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "../../../config/axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import bg from "../../../assets/bg-lnu.png";
import logo from "../../../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("login", form);
      if (data.status === 400) {
        alert("Wrong Username or Password")
      } else {
        localStorage.setItem("token", data.message);
        navigate("/dashboard");
      }
      console.log(data.status);
    } catch (error) {
      // console.log(error?.response!.data);
    }
  };

  return (
    <div className="w-screen h-screen bg-white relative">
      <img
        src={bg}
        alt=""
        className="w-screen h-screen bg-indigo-700 relative "
      />
      <div className="bg-indigo-800 px-8 pb-8 w-[380px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="w-35 h-35" />
        </div>

        <span className="text-md font-bold text-white">Login Account</span>

        <div className="grid w-full  items-center gap-1.5 mb-4 mt-5">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input
            className="bg-white"
            type="username"
            name="username"
            id="username"
            placeholder="....."
            onChange={handleForm}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input
            className="bg-white"
            type="password"
            name="password"
            id="password"
            placeholder="....."
            onChange={handleForm}
          />
        </div>
        <Button
          className="w-full mt-4 bg-amber-400 text-black hover:bg-amber-300"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
