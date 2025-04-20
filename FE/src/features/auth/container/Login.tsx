import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "../../../config/axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("login", form);
      navigate('/dashboard')
      console.log(data);
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  console.log(form);

  return (
    <div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          type="username"
          name="username"
          id="username"
          placeholder="username"
          onChange={handleForm}
        />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleForm}
        />
      </div>
      <Button className="w-full" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
}

export default Login;
