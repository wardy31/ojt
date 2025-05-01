import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "../../config/axios";

function AccountPage() {
  const [password, setPassword] = useState("");

  const submitPassword = async () => {
    if (!password.trim()) {
      alert("Password is required");
    } else {
      await axios.put("/password?isReset=false", {
        password: password,
      });
    }
  };

  const submitPasswordReset = async () => {
    await axios.put("/password?isReset=true", {
      password: password,
    });
  };

  return (
    <div>
      <div className="my-6">
        <h2 className="uppercase text-2xl font-bold text-gray-600">
          Account Setting
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
        <div className="w-[500px]">
          <div className="font-bold">Edit Password</div>
          <Input
            placeholder="type password"
            className="my-2"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>

          <div>
            <Button
              className="bg-indigo-600 hover:bg-indigo-500"
              onClick={submitPassword}
            >
              Confirm Edit
            </Button>
            <Button
              variant="ghost"
              className="text-red-600"
              onClick={submitPasswordReset}
            >
              Reset to default
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
